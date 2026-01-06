import React from 'react';
import styles from './button.module.scss';

interface ButtonProps {
    icon?: React.ReactNode;
    label: string;
    onClick?: () => void;
    className?: string;
}

const Button = ({icon, label, onClick, className}: ButtonProps) => {
    return (
        <button className={`${styles.figmaBtn} ${className}`} onClick={onClick}>
            {icon && <span className={styles.icon}>{icon}</span>}
            <span className={styles.label}>{label}</span>
        </button>
    );
};

export default Button;