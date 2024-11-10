<template>
  <div class="reportes">
    <h1><i class="fas fa-chart-line"></i> Generar Reportes</h1>

    <div class="reportes-form">
      <label for="tipo">Seleccionar tipo de reporte:</label>
      <select v-model="tipo" id="tipo">
        <option value="ocupacion">Ocupación</option>
        <option value="finanzas">Finanzas</option>
      </select>

      <label for="periodo">Seleccionar periodo:</label>
      <select v-model="periodo" id="periodo">
        <option value="diario">Diario</option>
        <option value="semanal">Semanal</option>
        <option value="mensual">Mensual</option>
      </select>

      <button @click="generarReporte">Generar Reporte</button>
    </div>

    <!-- Resultados -->
    <div v-if="reporteData" class="reporte-resultados">
      <h2>Reporte Generado:</h2>
      <div v-if="tipo === 'ocupacion'">
        <p><strong>Total Espacios:</strong> {{ reporteData.totalEspacios }}</p>
        <p><strong>Espacios Ocupados:</strong> {{ reporteData.espaciosOcupados }}</p>
        <p><strong>Espacios Disponibles:</strong> {{ reporteData.espaciosDisponibles }}</p>
      </div>
      <div v-if="tipo === 'finanzas'">
        <table>
          <thead>
            <tr>
              <th>Descripción</th>
              <th>Monto</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="tarifa in reporteData" :key="tarifa.idTarifa">
              <td>{{ tarifa.descripcion }}</td>
              <td>{{ tarifa.monto }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <button @click="generarPDFConEstilos">Descargar Reporte PDF</button>
    </div>

    <!-- Error -->
    <div v-if="error" class="error">
      <p>{{ error }}</p>
    </div>
  </div>
</template>

<script>
import jsPDF from 'jspdf';
import 'jspdf-autotable';

export default {
  data() {
    return {
      tipo: 'ocupacion',
      periodo: 'diario',
      reporteData: null,
      error: null
    };
  },
  methods: {
    // Método para generar el reporte y obtener los datos
    async generarReporte() {
      try {
        // Solicitar los datos del reporte desde el servidor
        const response = await fetch(`http://localhost:3001/api/reportes/${this.tipo}/${this.periodo}`, {
          method: 'GET',
        });

        if (response.ok) {
          // Convertir la respuesta en JSON y asignarla a reporteData
          this.reporteData = await response.json();
        } else {
          throw new Error('Error al obtener los datos del reporte');
        }
      } catch (error) {
        this.error = error.message;
      }
    },

    // Método para generar y descargar el PDF
    async generarReportePDF() {
      try {
        const response = await fetch(`http://localhost:3001/api/reportes/pdf/${this.tipo}/${this.periodo}`, {
          method: 'GET',
        });

        if (response.ok) {
          const blob = await response.blob();
          const link = document.createElement('a');
          link.href = URL.createObjectURL(blob);
          link.download = `reporte_${this.tipo}_${this.periodo}.pdf`;
          link.click();
        } else {
          throw new Error('Error al generar el reporte PDF');
        }
      } catch (error) {
        this.error = error.message;
      }
    },

    // Método para generar PDF con estilos modernos
    async generarPDFConEstilos() {
      const doc = new jsPDF();

      // Título del reporte
      doc.setFont('Helvetica', 'bold');
      doc.setTextColor('#ff7f00');
      doc.setFontSize(24);
      doc.text('Reporte de Parqueadero', 20, 30);

      // Estilo para subtítulos
      doc.setFontSize(16);
      doc.setFont('Helvetica', 'normal');
      doc.setTextColor('#333');
      doc.text(`Tipo de Reporte: ${this.tipo}`, 20, 50);
      doc.text(`Periodo: ${this.periodo}`, 20, 60);

      // Tabla con datos de ocupación
      if (this.tipo === 'ocupacion') {
        doc.autoTable({
          startY: 70,
          head: [['Descripción', 'Valor']],
          body: [
            ['Total Espacios', this.reporteData.totalEspacios],
            ['Espacios Ocupados', this.reporteData.espaciosOcupados],
            ['Espacios Disponibles', this.reporteData.espaciosDisponibles]
          ],
          theme: 'grid',
          headStyles: {
            fillColor: '#ff7f00',
            textColor: '#fff',
            fontSize: 12,
            halign: 'center',
          },
          styles: {
            fontSize: 12,
            cellPadding: 5,
            halign: 'center',
            valign: 'middle',
            textColor: '#333',
            cellWidth: 'auto',
            lineColor: '#222',
            lineWidth: 0.5,
          },
          margin: { top: 10 },
        });
      }

      // Tabla con datos financieros
      if (this.tipo === 'finanzas') {
        doc.autoTable({
          startY: 70,
          head: [['Descripción', 'Monto']],
          body: this.reporteData.map(tarifa => [tarifa.descripcion, tarifa.monto]),
          theme: 'grid',
          headStyles: {
            fillColor: '#ff7f00',
            textColor: '#fff',
            fontSize: 12,
            halign: 'center',
          },
          styles: {
            fontSize: 12,
            cellPadding: 5,
            halign: 'center',
            valign: 'middle',
            textColor: '#333',
            cellWidth: 'auto',
            lineColor: '#222',
            lineWidth: 0.5,
          },
          margin: { top: 10 },
        });
      }

      // Estilos de pie de página
      doc.setFontSize(10);
      doc.setTextColor('#888');
      doc.text('Generado automáticamente por Parking System', 20, doc.internal.pageSize.height - 10);

      // Descargar el PDF
      doc.save(`reporte_${this.tipo}_${this.periodo}.pdf`);
    }
  }
};
</script>

<style scoped>
/* Estilos generales */
.reportes {
  background-color: #222;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  max-width: 800px;
  margin: 20px auto;
  color: #ffd700;
}

h1 {
  font-size: 2rem;
  color: #ffd700;
  margin-bottom: 20px;
  font-family: 'Roboto', sans-serif;
}

.fas {
  margin-right: 10px;
}

/* Formulario de selección */
.reportes-form {
  background-color: #333;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}

label {
  display: block;
  font-size: 1rem;
  margin-bottom: 8px;
  color: #ffd700;
}

select {
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #555;
  border-radius: 5px;
  font-size: 1rem;
  color: #ffd700;
  background-color: #222;
}

button {
  background-color: #ffd700;
  color: black;
  padding: 12px 20px;
  font-size: 1rem;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  width: 100%;
}

button:hover {
  background-color: #ffea00;
}

.reporte-resultados {
  background-color: #333;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

th,
td {
  padding: 12px;
  text-align: left;
  border: 1px solid #555;
}

th {
  background-color: #222;
  color: #ffd700;
}

td {
  background-color: #222;
  color: #ffd700;
}

/* Mensajes de error */
.error {
  background-color: #c0392b;
  color: white;
  padding: 15px;
  border-radius: 5px;
  margin-top: 20px;
  font-weight: bold;
  text-align: center;
}

/* Responsividad */
@media (max-width: 768px) {
  .reportes {
    padding: 20px;
  }

  h1 {
    font-size: 1.8rem;
  }

  button {
    padding: 10px;
    font-size: 0.9rem;
  }

  select,
  button {
    font-size: 0.9rem;
  }
}

@media (max-width: 480px) {
  .reportes {
    padding: 15px;
  }

  h1 {
    font-size: 1.6rem;
  }

  select,
  button {
    padding: 8px;
    font-size: 0.8rem;
  }
}
</style>
