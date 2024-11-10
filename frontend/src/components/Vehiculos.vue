<template>
    <div class="container">
        <h1>{{ formTitle }}</h1>

        <!-- Formulario para registrar o editar vehículo -->
        <form @submit.prevent="submitForm" class="vehiculo-form">
            <div class="input-group">
                <label for="placa">Placa</label>
                <input v-model="formData.placa" type="text" id="placa" required />
            </div>

            <div class="input-group">
                <label for="marca">Marca</label>
                <input v-model="formData.marca" type="text" id="marca" required />
            </div>

            <div class="input-group">
                <label for="modelo">Modelo</label>
                <input v-model="formData.modelo" type="text" id="modelo" required />
            </div>

            <div class="input-group">
                <label for="color">Color</label>
                <input v-model="formData.color" type="text" id="color" required />
            </div>

            <div class="input-group">
                <label for="fechaEntrada">Fecha Entrada</label>
                <input v-model="formData.fechaEntrada" type="datetime-local" id="fechaEntrada" required />
            </div>

            <!-- Selección de espacio disponible -->
            <div class="input-group">
                <label for="idEspacio">Espacio</label>
                <select v-model="formData.idEspacio" id="idEspacio" required>
                    <option value="">Seleccione un espacio</option>
                    <option v-for="espacio in espaciosDisponibles" :key="espacio.idEspacio" :value="espacio.idEspacio">
                        {{ espacio.ubicacion }} - {{ espacio.estado }}
                    </option>
                </select>
            </div>

            <button type="submit" class="submit-btn">
                <i class="fas fa-car"></i> {{ formAction }} Vehículo
            </button>

            <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
        </form>

        <div class="search-container">
            <input v-model="search.placa" type="text" placeholder="Buscar por placa" class="search-input" />
            <input v-model="search.marca" type="text" placeholder="Buscar por marca" class="search-input" />
            <input v-model="search.color" type="text" placeholder="Buscar por color" class="search-input" />
        </div>

        <!-- Tabla para mostrar los vehículos -->
        <div class="table-container">
            <table class="vehiculo-table">
                <thead>
                    <tr>
                        <th>Placa</th>
                        <th>Marca</th>
                        <th>Modelo</th>
                        <th>Color</th>
                        <th>Espacio</th>
                        <th>Fecha Entrada</th>
                        <th>Fecha Salida</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-if="filteredVehiculos.length === 0">
                        <td colspan="8" class="text-center">No hay vehículos registrados</td>
                    </tr>
                    <tr v-for="vehiculo in filteredVehiculos" :key="vehiculo.idVehiculo">
                        <td>{{ vehiculo.placa }}</td>
                        <td>{{ vehiculo.marca }}</td>
                        <td>{{ vehiculo.modelo }}</td>
                        <td>{{ vehiculo.color }}</td>
                        <td>{{ vehiculo.espacio?.ubicacion || 'No asignado' }}</td>
                        <td>{{ formatDate(vehiculo.fechaEntrada) }}</td>
                        <td>{{ vehiculo.fechaSalida ? formatDate(vehiculo.fechaSalida) : 'No registrada' }}</td>
                        <td class="actions">
                            <button @click="editVehiculo(vehiculo.idVehiculo)" class="edit-btn">
                                <i class="fas fa-edit"></i> Editar
                            </button>
                            <button @click="deleteVehiculo(vehiculo.idVehiculo)" class="delete-btn">
                                <i class="fas fa-trash-alt"></i> Eliminar
                            </button>
                            <button v-if="!vehiculo.fechaSalida" @click="updateVehiculoSalida(vehiculo.idVehiculo)"
                                class="salida-btn">
                                <i class="fas fa-sign-out-alt"></i> Salida
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import { useToast } from 'vue-toastification';

export default {
    name: "Vehiculos",
    data() {
        return {
            vehiculos: [],
            espaciosDisponibles: [],
            formData: {
                placa: "",
                marca: "",
                modelo: "",
                color: "",
                fechaEntrada: "",
                fechaSalida: "",
                idEspacio: "",
            },
            search: {
                placa: "",
                marca: "",
                color: "",
            },
            formTitle: "Registrar Vehículo",
            formAction: "Agregar",
            editingId: null,
            errorMessage: "",
            updateInterval: null
        };
    },

    computed: {
        filteredVehiculos() {
            return this.vehiculos.filter(vehiculo => {
                return (
                    (this.search.placa ? vehiculo.placa.toLowerCase().includes(this.search.placa.toLowerCase()) : true) &&
                    (this.search.marca ? vehiculo.marca.toLowerCase().includes(this.search.marca.toLowerCase()) : true) &&
                    (this.search.color ? vehiculo.color.toLowerCase().includes(this.search.color.toLowerCase()) : true)
                );
            });
        },
    },

    methods: {
        formatDate(date) {
            if (!date) return '';
            return new Date(date).toLocaleString();
        },

        async fetchVehiculos() {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    this.errorMessage = "No hay token de autenticación";
                    return;
                }

                const response = await axios.get("http://localhost:3001/api/vehiculos", {
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (response.data && Array.isArray(response.data)) {
                    this.vehiculos = response.data;
                    console.log('Vehículos cargados:', this.vehiculos);
                } else {
                    console.error('Respuesta inválida:', response.data);
                    this.errorMessage = "Formato de datos inválido";
                }
            } catch (error) {
                console.error("Error al obtener vehículos:", error);
                this.errorMessage = error.response?.data?.message || "Error al cargar los vehículos";
            }
        },

        async fetchEspaciosDisponibles() {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    this.errorMessage = "No hay token de autenticación";
                    return;
                }

                const response = await axios.get("http://localhost:3001/api/espacios/disponibles", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                this.espaciosDisponibles = response.data;
            } catch (error) {
                console.error("Error al obtener espacios disponibles:", error);
                this.errorMessage = "Error al cargar los espacios disponibles";
            }
        },

        async submitForm() {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    this.errorMessage = "No hay token de autenticación";
                    return;
                }

                const formDataToSend = {
                    ...this.formData,
                    fechaEntrada: this.formData.fechaEntrada ? new Date(this.formData.fechaEntrada).toISOString() : null,
                    fechaSalida: this.formData.fechaSalida ? new Date(this.formData.fechaSalida).toISOString() : null,
                };

                if (this.editingId) {
                    await axios.put(
                        `http://localhost:3001/api/vehiculos/${this.editingId}`,
                        formDataToSend,
                        { headers: { Authorization: `Bearer ${token}` } }
                    );
                    toast.success("¡Vehículo actualizado con éxito!"); // Mensaje de éxito
                } else {
                    await axios.post(
                        "http://localhost:3001/api/vehiculos",
                        formDataToSend,
                        { headers: { Authorization: `Bearer ${token}` } }
                    );
                    toast.success("¡Vehículo agregado con éxito!"); // Mensaje de éxito
                }

                await this.fetchVehiculos();
                await this.fetchEspaciosDisponibles();
                this.clearForm();
            } catch (error) {
                console.error("Error en submitForm:", error);
                this.errorMessage = error.response?.data?.message || "Error al guardar el vehículo";
                toast.error(this.errorMessage); // Mensaje de error
            }
        },

        async editVehiculo(idVehiculo) {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get(`http://localhost:3001/api/vehiculos/${idVehiculo}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                const vehiculo = response.data;
                this.formData = {
                    placa: vehiculo.placa,
                    marca: vehiculo.marca,
                    modelo: vehiculo.modelo,
                    color: vehiculo.color,
                    fechaEntrada: vehiculo.fechaEntrada ? new Date(vehiculo.fechaEntrada).toISOString().slice(0, 16) : '',
                    fechaSalida: vehiculo.fechaSalida ? new Date(vehiculo.fechaSalida).toISOString().slice(0, 16) : '',
                    idEspacio: vehiculo.idEspacio
                };
                this.formTitle = "Editar Vehículo";
                this.formAction = "Actualizar";
                this.editingId = idVehiculo;
            } catch (error) {
                this.errorMessage = "Error al cargar los datos del vehículo.";
                console.error("Error:", error);
            }
        },

        async deleteVehiculo(idVehiculo) {
    if (!confirm('¿Está seguro de eliminar este vehículo?')) return;

    try {
        const token = localStorage.getItem("token");
        await axios.delete(`http://localhost:3001/api/vehiculos/${idVehiculo}`, {
            headers: { Authorization: `Bearer ${token}` },
        });

        toast.success("¡Vehículo eliminado con éxito!"); // Mensaje de éxito
        await this.fetchVehiculos();
        await this.fetchEspaciosDisponibles();
    } catch (error) {
        this.errorMessage = "Error al eliminar el vehículo.";
        toast.error(this.errorMessage); // Mensaje de error
        console.error("Error:", error);
    }
},

async updateVehiculoSalida(idVehiculo) {
    try {
        const token = localStorage.getItem("token");
        await axios.put(
            `http://localhost:3001/api/vehiculos/salida/${idVehiculo}`,
            {},
            { headers: { Authorization: `Bearer ${token}` } }
        );

        toast.success("¡Salida del vehículo registrada con éxito!"); // Mensaje de éxito

        await this.fetchVehiculos();
        await this.fetchEspaciosDisponibles();
    } catch (error) {
        this.errorMessage = "Error al registrar la salida del vehículo.";
        toast.error(this.errorMessage); // Mensaje de error
        console.error("Error:", error);
    }
},

        clearForm() {
            this.formData = {
                placa: "",
                marca: "",
                modelo: "",
                color: "",
                fechaEntrada: "",
                fechaSalida: "",
                idEspacio: "",
            };
            this.formTitle = "Registrar Vehículo";
            this.formAction = "Agregar";
            this.editingId = null;
            this.errorMessage = "";
        },
    },
    async mounted() {
        await this.fetchVehiculos();
        await this.fetchEspaciosDisponibles();
        // Configurar actualización automática cada minuto
        this.updateInterval = setInterval(async () => {
            await this.fetchVehiculos();
            await this.fetchEspaciosDisponibles();
        }, 60000);
    },
    beforeUnmount() {
        if (this.updateInterval) {
            clearInterval(this.updateInterval);
        }
    }
};
</script>

<style scoped>
/* General styles */
.container {
    width: 90%;
    margin: 20px auto;
    max-width: 1200px;
    color: #ffd700;
    padding: 20px;
}

/* Title */
h1 {
    text-align: center;
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 20px;
    color: black
}

/* Form styles */
.vehiculo-form {
    background-color: #333;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
    transition: all 0.3s ease;
    color: #ffd700;
}

.input-group {
    margin-bottom: 15px;
}

.input-group label {
    font-weight: bold;
    display: block;
    margin-bottom: 5px;
}

input,
select {
    width: 98%;
    padding: 12px;
    border: 1px solid #555;
    border-radius: 5px;
    background-color: #222;
    color: #ffd700;
    font-size: 1rem;
    transition: all 0.3s;
}

input:focus,
select:focus {
    border-color: #ffd700;
    outline: none;
}

.submit-btn {
    background-color: #ffd700;
    color: black;
    padding: 12px 20px;
    border: none;
    border-radius: 5px;
    width: 100%;
    cursor: pointer;
    font-weight: bold;
    transition: all 0.3s;
}

.submit-btn:hover {
    background-color: #ffea00;
}

/* Table styles */
.vehiculo-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
    color: #ffd700;
}

.vehiculo-table th,
.vehiculo-table td {
    padding: 12px;
    text-align: center;
    border-bottom: 1px solid #555;
}

.vehiculo-table th {
    background-color: #333;
    font-weight: bold;
}

.vehiculo-table td {
    background-color: #222;
}

/* Action buttons styles */
.actions {
    display: flex;
    justify-content: center;
    gap: 10px;
    flex-wrap: wrap;
}

button {
    padding: 8px 15px;
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.3s ease;
}

.edit-btn {
    background-color: #3498db;
    color: white;
}

.edit-btn:hover {
    background-color: #2980b9;
}

.delete-btn {
    background-color: #e74c3c;
    color: white;
}

.delete-btn:hover {
    background-color: #c0392b;
}

.salida-btn {
    background-color: #3498db;
    color: white;
}

.salida-btn:hover {
    background-color: #2980b9;
}

/* Error message styles */
.error-message {
    color: #e74c3c;
    margin-top: 10px;
}

.search-container {
    display: flex;
    gap: 10px;
    margin-top: 20px;
}

.search-input {
    padding: 8px;
    font-size: 1rem;
    border: 1px solid #ddd;
    border-radius: 5px;
    flex: 1;
}

/* Responsive Design */
@media (max-width: 768px) {

    /* Ajustes para pantallas pequeñas */
    .container {
        width: 95%;
        padding: 10px;
    }

    h1 {
        font-size: 1.5rem;
    }

    .vehiculo-form {
        padding: 15px;
    }

    .input-group {
        margin-bottom: 10px;
    }

    .submit-btn {
        padding: 10px;
    }

    .vehiculo-table th,
    .vehiculo-table td {
        font-size: 0.9rem;
        padding: 10px;
    }

    .actions button {
        font-size: 0.9rem;
        padding: 6px 12px;
    }

    /* Cambiar la disposición de los botones */
    .actions {
        gap: 5px;
    }
}

@media (max-width: 480px) {

    /* Ajustes para dispositivos más pequeños como teléfonos */
    .container {
        width: 100%;
        padding: 5px;
    }

    h1 {
        font-size: 1.2rem;
    }

    .vehiculo-form {
        padding: 10px;
    }

    input,
    select {
        font-size: 0.9rem;
        padding: 10px;
    }

    .vehiculo-table th,
    .vehiculo-table td {
        font-size: 0.8rem;
        padding: 8px;
    }

    .actions {
        flex-direction: column;
        align-items: center;
    }

    .actions button {
        width: 100%;
        margin-bottom: 10px;
    }
}
</style>