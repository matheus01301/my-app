import { styled, keyframes } from "../../../stitches.config";
import React, { useState, useEffect } from 'react';
import { Dropdown, MenuProps, Menu } from "antd";
import { DeleteOutlined, EditOutlined, MoreOutlined, BgColorsOutlined } from "@ant-design/icons";
import { IndicatorProps } from "../../interfaces/indicator";
import { useAlarmContext } from "../Context/AlarmContext";
import { fetchProperties, properties } from "../utils/utils";
import { useIndicators } from "../Context/IndicatorsContext";

const pulseBorderAnimation = keyframes({
    '0%, 100%': { borderColor: 'rgba(255, 0, 0, 1)' },
    '50%': { borderColor: 'rgba(255, 0, 0, 0.5)' },
});

const StyledCard = styled("div", {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    border: "1px solid #333",
    background: "#09090A",
    padding: '10px',
    borderRadius: "10px",
    width: '100%',
    height: '7vh',
    color: '#FFFFFF',
  });

const CardTitle = styled("span", {
    color: "$text",
    fontSize: "16px",
    opacity: "0.8",
    mx: "10px",
    marginBottom: "-4px",
    alignSelf: "flex-start",
});

const Title = styled("div", {
    fontSize: "14px",
    color: "#888",
  });
  
  const MainTitle = styled("div", {
    fontSize: "18px",
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: '10px',
  });

const StatusButton = styled("div", {
    backgroundColor: "#1A732D",
    color: "white",
    padding: "5px 10px",
    borderRadius: "5px",
    fontSize: "12px",
    alignSelf: "flex-start",
});

const CardValue = styled("span", {
    color: "$text",
    fontSize: "25px",
    fontWeight: "bold",
    textAlign: "center",
});

const CardUnit = styled("span", {
    color: "$text",
    fontSize: "1rem",
    fontWeight: "500",
    mx: "5px",
});

const Footer = styled("div", {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderTop: "1px solid #333",
    paddingTop: "10px",
    marginTop: "auto",
    width: "100%",
});

const FooterButton = styled("div", {
    display: "flex",
    alignItems: "center",
    fontSize: "14px",
    cursor: "pointer",
    color: "#888",

    '&:hover': {
        color: "#FFFFFF",
    },

    svg: {
        marginRight: "5px",
    }
});

const CardContent = styled("div", {
    width: "100%",
    height: "100%",
    flexGrow: 1,
    variants: {
        type: {
            gauge: {
                paddingBottom: '5px'
            },
            level: {
                paddingBottom: '5px'
            },
            indicator: {
                padding: "0px 10px",
            },
            default: {
                padding: "5px 10px",
            }
        }
    },
    defaultVariants: {
        type: 'default',
    },
});

interface CardProps {
    size?: string;
    indicator: IndicatorProps;
    onDelete: (indicator: IndicatorProps) => void;
    onUpdate: (indicator: IndicatorProps) => void;
}

const ContentCardType = ({ type, value, unit, property, minScale = 0, maxScale = 1000 }: IndicatorProps) => {
    const [value2, setValue2] = useState<any>({});

    switch (type) {
        case "indicator":
            return (
                <>
                    <CardValue>{value}</CardValue>
                    <CardUnit>{unit}</CardUnit>
                </>
            );
    }
};

export default function Card({ size = "sm", indicator, onDelete, onUpdate }: CardProps) {
    const [indicatorColor, setIndicatorColor] = useState(indicator.color);
    const [borderColor, setBorderColor] = useState<string | undefined>(undefined);
    const [animation, setAnimation] = useState<string | undefined>(undefined);

    const handleColorChange = (color) => {
        setIndicatorColor(color.hex);
    };

    return (
        <>
            <StyledCard style={{ borderColor: borderColor, animation: animation, backgroundColor: '#09090A' }} type={indicator.type as any} isAlarmActive={borderColor === 'red'}>
            {indicator.isLeftColumn ? (
                <MainTitle>{indicator.value}</MainTitle>
            ) : (
                <>
                    <MainTitle>{indicator.value}</MainTitle>
                </>
            )}
            </StyledCard>
        </>
    );
}
