import React, { useState } from 'react';
import { styled } from '../stitches.config';
import GridView from '../src/components/GridView/GridView';
import { Modal, Input, Form, Button as AntButton, Select } from 'antd';
import { useIndicators } from '../src/components/Context/IndicatorsContext';

const { Option } = Select;

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

  const handleOk = async () => {
    try {
      const values = await form.validateFields();

      // Extrai a hora inicial do intervalo selecionado
      const [startTime] = values.horario.split(' - ');

      // Envia a hora inicial ao invés do intervalo completo
      const payload = {
        ...values,
        horario: startTime,
      };

      // Faça o POST para criar a nova sala
      await fetch('http://127.0.0.1:8000/room/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      // Feche o modal
      setIsModalVisible(false);

      // Limpe o formulário
      form.resetFields();
    } catch (error) {
      console.error('Failed to create room:', error);
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const timeSlots = [
    "07:00 - 07:50",
    "07:50 - 08:40",
    "08:55 - 09:45",
    "09:45 - 10:35",
    "10:50 - 11:40",
    "11:40 - 12:30",
    "12:30 - 13:20",
    "13:20 - 14:10",
    "14:10 - 15:00",
    "15:00 - 15:50",
    "15:50 - 16:40",
    "16:50 - 17:40",
    "17:40 - 18:30",
    "18:45 - 19:35",
    "19:35 - 20:25",
    "20:35 - 21:25",
    "21:25 - 22:15"
  ];

  const rooms = [
    { id: 1, name: 'Sala 1' },
    { id: 2, name: 'Sala 2' },
    { id: 3, name: 'Sala 3' },
    { id: 4, name: 'Sala 4' },
  ];

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
        title="Create New Room"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Create"
        cancelText="Cancel"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Horário"
            name="horario"
            rules={[{ required: true, message: 'Please select the horário!' }]}
          >
            <Select placeholder="Select a time slot">
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
          <Form.Item
            label="ID do Usuário"
            name="id_usuario"
            rules={[{ required: true, message: 'Please input the user ID!' }]}
          >
            <Input placeholder="e.g., 1" />
          </Form.Item>
        </Form>
      </Modal>
    </React.Fragment>
  );
}
