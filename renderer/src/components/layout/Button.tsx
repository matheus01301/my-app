import { Button } from 'antd';
import { styled } from '../../../stitches.config';

const ButtonStyled = styled(Button, {
    '&.ant-btn': {
        border: 'none',
        borderRadius: '5px',
        mx: '5px',
        my: '5px',

        color: '$text',

        fontWeight: '600',

        '&.ant-btn.pagination__item--active': {
            color: '#165996',
            borderColor: '#165996',
        },
    },

    variants: {
        type: {
            primary: {
                '&.ant-btn': {
                    backgroundColor: '$link',
                    color: '$text',

                    '&:hover': {
                        backgroundColor: '$hoverBtn',
                        color: '$text',
                    },
                    '&:focus': {
                        backgroundColor: '$button',
                        color: '$text',
                    },
                }

            },
            secondary: {
                '&.ant-btn': {
                    backgroundColor: '$bgCard',

                    '&:hover,&:focus': {
                        backgroundColor: '$secondaryHoverBtn!important',
                        color: '$text',
                    }
                }

            },
            outline: {
                '&.ant-btn': {
                    backgroundColor: 'transparent',
                    border: '2px solid $secondaryBtn',
                    color: '$secondaryBtn',

                    '&:hover,&:focus': {
                        backgroundColor: '#EDEDED',
                        color: '$secondaryBtn',
                        border: '2px solid $secondaryBtn',
                    }
                }
            }
        }
    }
})

const ButtonComponent = ({ children, ...props },) => {
    return (
        <>
            <ButtonStyled {...props}>{children}</ButtonStyled>
        </>
    )
}

export default ButtonComponent;

