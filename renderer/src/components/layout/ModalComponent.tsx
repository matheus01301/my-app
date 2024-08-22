import { useState } from 'react';
import { styled } from '../../../stitches.config';
import { Button, Modal, Tooltip } from 'antd';
import ButtonComponent from './Button';
import { ArrowLeftOutlined } from '@ant-design/icons';

const StyledModal = styled(Modal, {
    '& .ant-modal-content': {
        backgroundColor: '#09090A',
        '& .ant-modal-header': {
            borderRadius: '5px 5px 0 0',
            paddingLeft: '54px',
            backgroundColor: '#09090A',
            '& .ant-modal-title': {
                fontWeight: '600',
                fontSize: '18px',
            },
        },
        '& .ant-modal-footer': {
            border: 'none',
            backgroundColor: '#09090A',
        },
        '& .ant-modal-close': {
            left: 0,
            color: '#fff',
        },
        borderRadius: '5px',
    },
    '& .ant-modal-body': {
        backgroundColor: '#09090A',
    }
});

export default function ModalComponent({ visible, onCancel, onOk, ...props }) {
    return (
        <>
            {props.tooltip != null ?
                <Tooltip placement={props.tooltip.placement} title={props.tooltip.text}>
                    <ButtonComponent type={props.button?.type} style={props.button?.style} onClick={props.showModal}>
                        {props.button?.title}
                    </ButtonComponent>
                </Tooltip> : <ButtonComponent type={props.button?.type} style={props.button?.style} onClick={props.showModal}>
                    {props.button?.title}
                </ButtonComponent>}
            <StyledModal
                title={props.title}
                visible={visible}
                onOk={onOk}
                width={1200}
                onCancel={onCancel}
                maskClosable={true} // Adiciona esta linha para fechar ao clicar fora
                closeIcon={<ArrowLeftOutlined />}
                footer={[
                    <Button key="back" type="ghost" shape="round" onClick={onCancel}>Cancel</Button>,
                    <Button key="submit" type="primary" shape="round" onClick={onOk}>OK</Button>
                ]}
            >
                {props.children}
            </StyledModal>
        </>
    )
}
