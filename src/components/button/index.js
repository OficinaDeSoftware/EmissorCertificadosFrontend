import styles from './button.module.css'

export const ButtonType = {
    DEFAULT: 1,
    OUTLINE: 2,
    SECONDARY: 3,
    DANGER: 4,
}

function ClassByType( styleType, isEnabled ){

    if( !isEnabled ){
        return styles.disabled;
    }

    switch( styleType ){
        case ButtonType.OUTLINE:
            return styles.outline;
        case ButtonType.SECONDARY:
            return styles.secondary;
        case ButtonType.DANGER:
            return styles.danger;
        default:
            return styles.default;
    }
}

// TODO permitir personalizar a cor, criar um Botão de confirmação e um de voltar, com cores padrão 

export default function Button( props ) {

    const { isEnabled, ...rest } = props
    /* Propriedade styleType causa erro no console, por isso usar styletype em lower case */
    return (
        <button 
            onClick={props.onClick}
            disabled={ !isEnabled }
            className={`${styles.content} ${ ClassByType( props.styletype || 1, isEnabled ?? true ) }`} 
            {...rest}>
            { props.icon ?? <></> }
            { props.children }
        </button>
    );
}
