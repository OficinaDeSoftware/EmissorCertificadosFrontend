import styles from './button.module.css'

export const ButtonType = {
    DEFAULT: 1,
    OUTLINE: 2,
}

function ClassByType( styleType, isEnabled ){

    if( !isEnabled ){
        return styles.disabled;
    }

    switch( styleType ){
        case ButtonType.OUTLINE:
            return styles.outline;
        default:
            return styles.default;
    }
}

// TODO permitir personalizar a cor, criar um Botão de confirmação e um de voltar, com cores padrão 

export default function Button( props ) {

    const { isEnabled, ...rest } = props

    return (
        <button 
            onClick={props.onClick}
            className={`${styles.content} ${ ClassByType( props.styleType, isEnabled ?? true ) }`} 
            {...rest}>
            { props.icon ?? <></> }
            { props.children }
        </button>
    );
}
