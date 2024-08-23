import React, { useState } from 'react';
import { styled } from '../stitches.config';
import GridView from '../src/components/GridView/GridView';
import { Modal, Input, Form, Tabs, Select } from 'antd';
import { useIndicators } from '../src/components/Context/IndicatorsContext';
import { timeSlots, rooms } from '../src/components/utils/utils';
import { getCurrentUser, deleteRoomHorario } from '../src/components/utils/utils';

const { Option } = Select;
const { TabPane } = Tabs;

const Container = styled('div', {
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  backgroundColor: '#09090A',
  padding: '20px',
});

const ContainerGrid = styled('div', {
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  backgroundColor: '#09090A',
  height: '100%'
});

const Title = styled('div', {
  color: 'white',
  fontSize: '24px',
});

const Button = styled('button', {
  backgroundColor: '#1A73E8',
  color: 'white',
  padding: '10px 20px',
  borderRadius: '5px',
  border: 'none',
  cursor: 'pointer',

  '&:hover': {
    backgroundColor: '#155AB5',
  }
});

export default function HomePage() {
  const { updateRoomIndicator } = useIndicators();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [deleteForm] = Form.useForm();

  const handleOk = async () => {
    try {
        const values = await form.validateFields();

        const currentUser = await getCurrentUser();

        const payload = {
            id_room: values.id_room,
            id_usuario: currentUser.id_usuario,
            horarios: values.horarios.map(horario => {
                const firstPart = horario.split(' - ')[0];
                return { horario: firstPart };
            }),
        };

        const token = localStorage.getItem('token');
        console.log(payload);

        const response = await fetch('http://127.0.0.1:8000/room/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Failed to create room:', errorData);
            return;
        }

        const data = await response.json();

        values.horarios.forEach(horario => {
            updateRoomIndicator(values.id_room);
        });

        setIsModalVisible(false);

        form.resetFields();
    } catch (error) {
        console.error('Failed to create room:', error);
    }
  };

  const handleDelete = async () => {
    try {
        const values = await deleteForm.validateFields();

        await deleteRoomHorario(values.id_room, values.horario);
        {/* @ts-ignore */}
        updateRoomIndicator(values.id_room, values.horario);

        setIsModalVisible(false);
        deleteForm.resetFields();
    } catch (error) {
        console.error('Failed to delete room horario:', error);
    }
};

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
    deleteForm.resetFields();
  };

  return (
    <React.Fragment>
      <Container>
        <Title>Salas</Title>
        <Button onClick={() => setIsModalVisible(true)}>+ Agendamento</Button>
      </Container>
      <div style={{ width: '100%', height: '70vh' }}>
        <ContainerGrid>
          <GridView />
        </ContainerGrid>
      </div>

      <Modal
        title="Gerenciar Agendamentos"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Tabs defaultActiveKey="1">
          <TabPane tab="Criar Agendamento" key="1">
            <Form form={form} layout="vertical" onFinish={handleOk}>
              <Form.Item
                label="Horários"
                name="horarios"
                rules={[{ required: true, message: 'Please select the horários!' }]}
              >
                <Select
                  mode="multiple"
                  placeholder="Select time slots"
                >
                  {timeSlots.map((slot) => (
                    <Option key={slot} value={slot}>
                      {slot}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                label="ID da Sala"
                name="id_room"
                rules={[{ required: true, message: 'Please select the room!' }]}
              >
                <Select placeholder="Select a room">
                  {rooms.map((room) => (
                    <Option key={room.id} value={room.id}>
                      {room.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item>
                {/* @ts-ignore */}
                <Button type="primary" htmlType="submit">
                  Criar Agendamento
                </Button>
              </Form.Item>
            </Form>
          </TabPane>
          <TabPane tab="Deletar Agendamento" key="2">
            <Form form={deleteForm} layout="vertical" onFinish={handleDelete}>
              <Form.Item
                label="Horário"
                name="horario"
                rules={[{ required: true, message: 'Please select the horário to delete!' }]}
              >
                <Select placeholder="Select a time slot">
                  {timeSlots.map((slot) => (
                    <Option key={slot} value={slot.split(' - ')[0]}>
                      {slot}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                label="ID da Sala"
                name="id_room"
                rules={[{ required: true, message: 'Please select the room!' }]}
              >
                <Select placeholder="Select a room">
                  {rooms.map((room) => (
                    <Option key={room.id} value={room.id}>
                      {room.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item>
                {/* @ts-ignore */}
                <Button type="primary" htmlType="submit" danger>
                  Deletar Agendamento
                </Button>
              </Form.Item>
            </Form>
          </TabPane>
        </Tabs>
      </Modal>
    </React.Fragment>
  );
}
