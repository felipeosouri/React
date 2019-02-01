import React, { Component } from 'react';
import { Modal, Button, Popover, Tooltip, OverlayTrigger } from 'react-bootstrap';
import { Histogram, DensitySeries, BarSeries, withParentSize, XAxis, YAxis } from '@data-ui/histogram';

class TablaAutomatizaciones extends Component {

    constructor(props, context) {
        super(props, context);
        this.callWsAutomatizaciones();
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.cerrarModalHistograma = this.cerrarModalHistograma.bind(this);
        this.mostrarModalHistograma = this.mostrarModalHistograma.bind(this);

        this.state = {
            show: false,
            modalHistograma: false,
            error: null,
            items: [],
            wsRespuestaHistograma: [],
            datosHistograma: []
        };
    }

    callWsAutomatizaciones = () => {
        setInterval(() => {
            console.log("entro");
            fetch("http://localhost:59000/InfoAutomatizaciones.svc/automatizaciones/")
                .then((resolve) => resolve.json())
                .then(data => {
                    this.setState({
                        items: data
                    });
                });
        }, 3 * 10000);
    }

    wsHistograma = () => {
        Promise.all([fetch("http://localhost:59000/InfoAutomatizaciones.svc/histograma/ALCALDIA")])
        .then(([data]) => {
            console.log('data');
            console.log(data);
            this.setState({
                wsRespuestaHistograma: data
            });
        })
        console.log('this.state.wsRespuestaHistograma');
        console.log(this.state.wsRespuestaHistograma);
    }

    cargarDatosHistograma = () => {
        var insumoHistograma = [];
        this.state.items.map((fila, index) => {

            for (let i = 0; i < fila.hora1; i++) {
                insumoHistograma.push(1);
            }
            for (let i = 0; i < fila.hora2; i++) {
                insumoHistograma.push(2);
            }
            for (let i = 0; i < fila.hora3; i++) {
                insumoHistograma.push(3);
            }
            for (let i = 0; i < fila.hora4; i++) {
                insumoHistograma.push(4);
            }
            for (let i = 0; i < fila.hora5; i++) {
                insumoHistograma.push(5);
            }
            for (let i = 0; i < fila.hora6; i++) {
                insumoHistograma.push(6);
            }
            for (let i = 0; i < fila.hora7; i++) {
                insumoHistograma.push(7);
            }
            for (let i = 0; i < fila.hora8; i++) {
                insumoHistograma.push(8);
            }
            for (let i = 0; i < fila.hora9; i++) {
                insumoHistograma.push(9);
            }
            for (let i = 0; i < fila.hora10; i++) {
                insumoHistograma.push(10);
            }
            for (let i = 0; i < fila.hora11; i++) {
                insumoHistograma.push(11);
            }
            for (let i = 0; i < fila.hora12; i++) {
                insumoHistograma.push(12);
            }
        })

        this.state = {
            datosHistograma: insumoHistograma
        };
    };

    handleClose() {
        this.setState({ show: false });
    }

    handleShow() {
        this.setState({ show: true });
    }

    cerrarModalHistograma() {
        this.setState({ modalHistograma: false });
    }

    mostrarModalHistograma() {
        console.log('wsHistograma');
        this.wsHistograma();
        console.log('cargarDatosHistograma');
        this.cargarDatosHistograma();
        console.log('fin');
        this.setState({ modalHistograma: true });
    }

    render() {
        var data = this.state;

        const ResponsiveHistogram = withParentSize(({ parentWidth, parentHeight, ...rest }) => (
            <Histogram
                width={600}
                height={300}
                {...rest}
            />
        ));

        const popover = (
            <Popover id="modal-popover" title="popover">
                very popover. such engagement
            </Popover>
        );
        const tooltip = <Tooltip id="modal-tooltip">wow.</Tooltip>;

        return (
            <div >
                <h3 className="text-center p-3">Monitoreo Automatizaciones</h3>
                <table className="table table-bordered">
                    <thead className="thead-dark">
                        <tr>
                            <th>Nombre Automatizacion</th>
                            <th>Estado</th>
                            <th>Cantidad Ejecuciones</th>
                            <th>Uso</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.items.map((fila, index) => {
                            let estadoSemaforo;
                            if (fila.Estado < '70') {
                                estadoSemaforo = 'fas fa-times-circle bug';
                            } else if (fila.Estado == '100') {
                                estadoSemaforo = 'fas fa-check-circle good';
                            } else {
                                estadoSemaforo = 'fas fa-exclamation-triangle warning';
                            }
                            return (
                                <tr key={index}>
                                    <td><span onClick={this.handleShow}>{fila.NombreAutomatizacion}</span></td>
                                    <td>
                                        <i id="estadoFila" className={`${estadoSemaforo}`}></i>
                                    </td>
                                    <td>{fila.NumeroEjecuciones}
                                    </td>
                                    <td onClick={this.mostrarModalHistograma}>
                                        <div className="progress">
                                            <div className="progress-bar" role="progressbar" style={{ width: `${fila.PorcentajeUso}%` }} aria-valuenow={25} aria-valuemin={0} aria-valuemax={100}>{fila.PorcentajeUso}%</div>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>

                <Modal
                    show={this.state.show}
                    onHide={this.handleClose}
                    aria-labelledby='ModalHeader'
                    animation={false} // Por esta mierda de la animacion no queria dar, la puse en false
                >
                    <Modal.Header id='ModalHeader' closeButton>
                        <Modal.Title>Nombre de la Automatizacion</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h4>Descripciòn y datos relevantes</h4>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.handleClose}>Ok</Button>
                    </Modal.Footer>
                </Modal>

                <Modal
                    show={this.state.modalHistograma}
                    onHide={this.cerrarModalHistograma}
                    aria-labelledby='ModalHeader'
                    animation={false} // Por esta mierda de la animacion no queria dar, la puse en false
                >
                    <Modal.Header id='ModalHeader' closeButton>
                        <Modal.Title>histograma</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <ResponsiveHistogram
                            ariaLabel="My histogram"
                            categorical={true}
                            binCount={25}
                            valueAccessor={datum => datum}
                            binType="numeric"
                            //tooltip informativo
                            renderTooltip={({ event, datum, data, color }) => (
                                <div>
                                    <strong style={{ color }}>{datum.bin0} to {datum.bin1}</strong>
                                    <div><strong>count </strong>{datum.count}</div>
                                    <div><strong>cumulative </strong>{datum.cumulative}</div>
                                    <div><strong>density </strong>{datum.density}</div>
                                </div>
                            )}
                        >
                            <BarSeries
                                animated
                                rawData={this.state.datosHistograma}
                            />
                            <XAxis />
                            <YAxis />
                        </ResponsiveHistogram>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.cerrarModalHistograma}>Ok</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

export default TablaAutomatizaciones;