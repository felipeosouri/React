import React, { Component } from 'react';
import { Histogram, DensitySeries, BarSeries, withParentSize, XAxis, YAxis } from '@data-ui/histogram';
import prueba from './pepimaricon.json';

class TablaHistorial extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            items: [],
            datosHistograma: []
        };
        
    }

    wsHistograma = () => {
        fetch("http://localhost:59000/InfoAutomatizaciones.svc/histograma/ALCALDIA")
            .then((resolve) => resolve.json())
            .then(data => {
                this.setState({
                    items: data
                });
            });
            console.log('wsHistograma');
            console.log(this.state.items);
    }

    prueba = () => {
        var cadena = [];
        console.log('prueba');
        console.log(this.state.items);
        this.state.items.map((fila, index) => {

            for (let i = 0; i < fila.hora1; i++) {
                cadena.push(1);
            }
            for (let i = 0; i < fila.hora2; i++) {
                cadena.push(2);
            }
            for (let i = 0; i < fila.hora3; i++) {
                cadena.push(3);
            }
            for (let i = 0; i < fila.hora4; i++) {
                cadena.push(4);
            }
            for (let i = 0; i < fila.hora5; i++) {
                cadena.push(5);
            }
            for (let i = 0; i < fila.hora6; i++) {
                cadena.push(6);
            }
            for (let i = 0; i < fila.hora7; i++) {
                cadena.push(7);
            }
            for (let i = 0; i < fila.hora8; i++) {
                cadena.push(8);
            }
            for (let i = 0; i < fila.hora9; i++) {
                cadena.push(9);
            }
            for (let i = 0; i < fila.hora10; i++) {
                cadena.push(10);
            }
            for (let i = 0; i < fila.hora11; i++) {
                cadena.push(11);
            }
            for (let i = 0; i < fila.hora12; i++) {
                cadena.push(12);
            }
        })

        this.state = {
            datosHistograma: cadena
        };
    };

    render() {
        var data = this.state.items;
        //define el tamaño del histograma
        const ResponsiveHistogram = withParentSize(({ parentWidth, parentHeight, ...rest }) => (
            <Histogram
                width={600}
                height={300}
                {...rest}
            />
        ));

        return (
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
        )
    }
}

export default TablaHistorial;