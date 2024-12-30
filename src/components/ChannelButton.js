import styles from "./styles/ChannelButton.module.css";

const ChannelButton = ({ text, onClick, isSelected }) =>
{
    return (
        <div
            className={isSelected ? styles.buttonSelected : styles.button}
            onClick={onClick}
        >
            {text}
        </div>
    )
}

export default ChannelButton;