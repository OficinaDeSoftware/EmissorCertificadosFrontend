'use client'
import ItemList from "@/components/itemList";
import Modal from "@/components/modal/index";
import { useEffect, useState } from "react";
import { fetchData } from "@/app/api/utils/apiUtils";

export default function ListarEventos() {
    const [eventos, setEventos] = useState([]);
    const [eventoModal, setEventoModal] = useState({});
    const [isModalVisible, setIsModalVisible] = useState(false);

    const getEventos = async () => {
        const response = await fetchData(`${process.env.API_BASE_URL}/eventos`)
        const data = await response.json()
        if (response.status === 200) {
            setEventos(data);
        } else {
            console.log('Erro ao buscar eventos')
        }
    };

    useEffect(() => {
        //getEventos();
        /**/
        setEventos([
            {
                nome: 'Evento 1',
                descricao: 'Descrição 1',
                dsDateStart: '01/01/2021',
                dsTimeStart: '10:00',
                dsDateEnd: '01/01/2021',
                dsTimeEnd: '12:00',
                local: 'Auditório Principal',
                organizador: 'Organizador 1',
                id:1
            },
            {
                nome: 'Evento 2',
                descricao: 'Descrição do evento',
                dsDateStart: '11/12/2023',
                dsTimeStart: '14:00',
                dsDateEnd: '15/12/2023',
                dsTimeEnd: '18:00',
                local: 'Auditório Principal',
                organizador: 'Organizador 1',
                id:3
            }

        ])
        /**/
    }, []);

    const showModal = (evento) => {
        setEventoModal(evento);
        setIsModalVisible(true);
    }

    const hideModal = () => {
        setEventoModal({});
        setIsModalVisible(false);
    }

    const realizarInscricao = async () => {
        //TODO: enviar requisição para realizar inscrição
        hideModal();
    }

    return (
        <div className="main">
            <h1>Eventos Disponíveis</h1>
            <div className="defaultGrid">
                {
                    eventos.length > 0 ?
                        eventos.map((evento) => {
                            return (
                                <ItemList
                                    key={evento.id}
                                    title={evento.nome}
                                    subtitle={evento.descricao}
                                    buttonTitle="Inscrever-se"
                                    onClick={() => showModal(evento)}
                                />
                            )
                        }) :
                        <h2>Nenhum evento próximo disponível</h2>
                }
            </div>
            {
                isModalVisible &&
                <Modal
                    title={eventoModal.nome}
                    dismiss={hideModal}
                    buttonTitle="Realizar Inscrição"
                    onClick={realizarInscricao}
                >
                    {
                        //Exibir as informações do evento
                        /*
                        HU 0.1
                        */
                    }
                </Modal>
            }
        </div>
    )
}