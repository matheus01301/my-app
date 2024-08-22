import React, { useContext, useEffect, useRef, useState } from 'react';
import { Table as AntTable, Button, Form, Input, Popconfirm, Modal, Select, Switch } from 'antd';
import type { FormInstance } from 'antd/es/form';
import { styled } from "../../../stitches.config";

const StyledTable = styled(AntTable, {
  backgroundColor: '$bg',
  color: '$text',

  '& .ant-table-thead > tr > th': {
    backgroundColor: '$hmenu',
    color: '$text',
  },
  '& .ant-table-tbody > tr > td': {
    backgroundColor: '$bg',
    color: '$text',
  },
  '& .ant-table-cell': {
    borderColor: '#333',
  },
});

const EditableContext = React.createContext<FormInstance<any> | null>(null);

interface Sala {
  id_sala: number;
  sala: number;
  laboratorio: string;
  auditorio: string;
}

interface TableSalaProps {
  data: Sala[];
  properties: { [key: number]: string };
}

const EditableRow: React.FC<{ index: number }> = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

const EditableCell: React.FC<{
  title: React.ReactNode;
  editable: boolean;
  children: React.ReactNode;
  dataIndex: keyof Sala;
  record: Sala;
  handleSave: (record: Sala) => void;
}> = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<InputRef>(null);
  const form = useContext(EditableContext)!;

  useEffect(() => {
    if (editing) {
      inputRef.current!.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({ [dataIndex]: record[dataIndex] });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{ margin: 0 }}
        name={dataIndex}
        rules={[{ required: true, message: `${title} is required.` }]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{ paddingRight: 24 }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

const TableSala: React.FC<TableSalaProps> = ({ data, properties }) => {
  const [dataSource, setDataSource] = useState(data.map((item, index) => ({
    key: item.id_sala.toString(),
    id_sala: item.id_sala,
    sala: item.sala,
    laboratorio: item.laboratorio,
    auditorio: item.auditorio,
  })));
  const [count, setCount] = useState(data.length);
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  useEffect(() => {
    setDataSource(data.map((item, index) => ({
      key: item.id_sala.toString(),
      id_sala: item.id_sala,
      sala: item.sala,
      laboratorio: item.laboratorio,
      auditorio: item.auditorio,
    })));
  }, [data]);

  const handleSave = (row: Sala) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    if (index > -1) {
      const item = newData[index];
      newData.splice(index, 1, { ...item, ...row });
      setDataSource(newData);
    }
  };

  const showModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const columns = [
    {
      title: 'ID Sala',
      dataIndex: 'id_sala',
      width: '15%',
    },
    {
      title: 'Sala',
      dataIndex: 'sala',
    },
    {
      title: 'Laboratório',
      dataIndex: 'laboratorio',
    },
    {
      title: 'Auditório',
      dataIndex: 'auditorio',
    },
    {
      title: 'Ação',
      dataIndex: 'operation',
      render: (_, record) =>
        dataSource.length >= 1 ? (
          <Popconfirm title="Confirma a exclusão?" onConfirm={() => handleDelete(record.key)}>
            <a>Delete</a>
          </Popconfirm>
        ) : null,
    },
  ];

  return (
    <div>
      <Button onClick={showModal} type="primary" style={{ marginBottom: 16 }}>
        + Add Sala
      </Button>
      <Modal title="Add Sala" visible={modalVisible} onCancel={closeModal}>
        <Form form={form}>
          <Form.Item
            label="Sala"
            name="sala"
            rules={[{ required: true, message: 'Sala é obrigatória' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Laboratório" name="laboratorio" rules={[{ required: true, message: 'Laboratório é obrigatório' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Auditório" name="auditorio" rules={[{ required: true, message: 'Auditório é obrigatório' }]}>
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Salvar
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <StyledTable
        components={components}
        rowClassName={() => 'editable-row'}
        bordered
        dataSource={dataSource}
        columns={columns}
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
};

export default TableSala;
