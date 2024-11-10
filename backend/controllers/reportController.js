const Tarifa = require('../models/Tarifa');
const Espacio = require('../models/Espacio');
const { Op } = require('sequelize');
const PDFDocument = require('pdfkit');
const fs = require('fs');

const generarReporte = async (req, res) => {
    const { tipo, periodo } = req.params;

    try {
        let reportData;

        switch (tipo) {
            case 'ocupacion':
                reportData = await obtenerOcupacion();
                break;
            case 'finanzas':
                reportData = await obtenerFinanzas();
                break;
            default:
                return res.status(400).json({ error: 'Tipo de reporte no válido' });
        }

        res.json(reportData);
    } catch (error) {
        console.error("Error generando reporte:", error);
        res.status(500).json({ error: 'Error al generar el reporte' });
    }
};

// Generar reporte en formato PDF
const generarReportePDF = async (req, res) => {
    const { tipo, periodo } = req.params;

    try {
        let reportData;

        // Obtener los datos del reporte (basado en tipo y periodo)
        switch (tipo) {
            case 'ocupacion':
                reportData = await obtenerOcupacion();
                break;
            case 'finanzas':
                reportData = await obtenerFinanzas();
                break;
            default:
                return res.status(400).json({ error: 'Tipo de reporte no válido' });
        }

        // Crear el documento PDF
        const doc = new PDFDocument();
        const filename = `reporte_${tipo}_${periodo}.pdf`;

        // Establecer los encabezados de la respuesta para forzar la descarga del archivo
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename=${filename}`);

        // Pipe the PDF document to the response
        doc.pipe(res);

        // Título principal
        doc.fontSize(18).fillColor('gold').text(`Reporte de ${tipo.charAt(0).toUpperCase() + tipo.slice(1)} - ${periodo}`, { align: 'center' });
        doc.moveDown(1);

        if (tipo === 'ocupacion') {
            doc.fontSize(14).fillColor('white').text(`Total Espacios: ${reportData.totalEspacios}`, { align: 'left' });
            doc.text(`Espacios Ocupados: ${reportData.espaciosOcupados}`, { align: 'left' });
            doc.text(`Espacios Disponibles: ${reportData.espaciosDisponibles}`, { align: 'left' });
        } else if (tipo === 'finanzas') {
            doc.fontSize(14).fillColor('white').text('Detalles de las tarifas:', { align: 'left' });
            doc.moveDown(0.5);

            // Agregar tabla de tarifas
            doc.fontSize(12);
            doc.fillColor('gold');
            doc.text('Descripción', 50, doc.y, { continued: true, width: 250, align: 'left' });
            doc.text('Monto', 350, doc.y, { align: 'right' });
            doc.moveDown(0.5);
            
            reportData.forEach(tarifa => {
                doc.fillColor('white');
                doc.text(tarifa.descripcion, 50, doc.y, { continued: true, width: 250, align: 'left' });
                doc.text(`$${tarifa.monto}`, 350, doc.y, { align: 'right' });
                doc.moveDown(0.5);
            });
        }

        // Finalizar el documento PDF
        doc.end();

    } catch (error) {
        console.error("Error generando reporte en PDF:", error);
        res.status(500).json({ error: 'Error al generar el reporte en PDF' });
    }
};

// Función para obtener datos de ocupación
const obtenerOcupacion = async () => {
    const totalEspacios = await Espacio.count();  // Contar todos los espacios
    const espaciosOcupados = await Espacio.count({
        where: { estado: 'Ocupado' }  // Contar solo los espacios ocupados
    });
    const espaciosDisponibles = totalEspacios - espaciosOcupados;  // Calcular los espacios disponibles

    return {
        totalEspacios,
        espaciosOcupados,
        espaciosDisponibles
    };
};

// Función para obtener datos financieros
const obtenerFinanzas = async () => {
    try {
        const tarifas = await Tarifa.findAll();
        if (tarifas.length === 0) {
            throw new Error('No se encontraron tarifas definidas');
        }

        return tarifas.map(tarifa => ({
            descripcion: tarifa.descripcion,
            monto: tarifa.monto,
        }));
    } catch (error) {
        throw new Error('Error al obtener las tarifas: ' + error.message);
    }
};

// Exportar la función generadora de reporte
module.exports = { generarReporte, generarReportePDF };
