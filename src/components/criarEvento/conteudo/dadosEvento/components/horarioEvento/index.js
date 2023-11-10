import styles from './horario.evento.module.css'

import InputForm from '@/components/inputForm'

import DateValidator from '@/helper/validator/date/DateValidator'
import MessageHelper from '@/helper/validator/message/MessageHelper'
import DateHelper from '@/helper/date/DateHelper'
import ButtonRemove from './components/button/remove'

import { PiTrash } from 'react-icons/pi'

export default function HorarioEvento( { item, index, arrayName, remove }) {

    const EventTimeSchema = {
        date: {
            validate: ( value, formValues ) => {

                if( index === 0 ){
                    return DateValidator.validateDateInterval( formValues.dateStart, value, formValues.dateEnd )
                }

                return DateValidator.validateDateInterval( formValues.dates[index-1].date, value, formValues.dateEnd )
            }
        },
        startTime: {
            validate: ( value, formValues ) => {

                if( index === 0 && DateHelper.isEqualsDateFromString( formValues.dates[index].date, formValues.dateStart ) ) {
                    return DateValidator.validateHourMin( value, DateHelper.timeFromDateTimeAsString( new Date( formValues.dateStart ) ) );
                }

                if( index !== 0 && DateHelper.isEqualsDateFromString( formValues.dates[index].date, formValues.dates[index-1].date ) ){
                    return DateValidator.validateHourMin( value, formValues.dates[index-1].endTime );
                }

                return DateValidator.validateHourMax( value, formValues.dates[index].endTime );

            }
        },
        endTime: {
            validate: ( value, formValues ) => {

                if( !value ){
                    return MessageHelper.required
                }

                if( DateHelper.isEqualsDateFromString( formValues.dates[index].date, formValues.dateEnd ) ){
                    return DateValidator.validateHourMax( value, DateHelper.timeFromDateTimeAsString( new Date( formValues.dateEnd ) ) );
                }

                return true
            }
        }
    }

    return(
        <div className={styles.content}>
            <InputForm
            params={EventTimeSchema.date}
            id='date'
            name={`${arrayName}.${index}.date`}
            title='Dia'
            type='date'/>
            <InputForm
            params={EventTimeSchema.startTime}
            id='horarioDeInicio'
            name={`${arrayName}.${index}.startTime`}
            title='Horário de início'
            type='time'/>
            <InputForm
            params={EventTimeSchema.endTime}
            id='horarioDeEncerramento'
            name={`${arrayName}.${index}.endTime`}
            title='Horário de Encerramento'
            type='time'/>
            <div className={styles.buttonRemove}>
                <ButtonRemove 
                type="button"
                onClick={remove}>
                    <PiTrash size={20} color={"#FFFFFF"} />
                </ButtonRemove>
            </div>
        </div>
    )
}