export const carreras = {
  isi: {
    nombre: "Ingeniería en Sistemas de Información",
    correlativas: {
      9: { r: [1, 2] },
      10: { r: [1, 3] },
      12: { r: [4] },
      13: { r: [5, 6] },
      14: { r: [5, 6] },
      15: { r: [7] },
      16: { r: [6, 8] },
      17: { r: [1, 2] },
      18: { p: [1, 2] },
      19: { r: [13, 16], p: [5, 6] },
      20: { r: [14, 16], p: [5, 6] },
      21: { p: [3, 7] },
      22: { r: [9], p: [1, 2] },
      23: { r: [14, 16], p: [4, 6, 8] },
      24: { r: [11] },
      25: { r: [19, 20, 23], p: [13, 14] },
      26: { r: [15, 21] },
      27: { r: [17, 22] },
      28: { r: [17], p: [9] },
      29: { r: [10, 22], p: [9] },
      30: { r: [18, 23], p: [16] },
      31: { r: [28], p: [17, 22] },
      32: { r: [28], p: [17, 19] },
      33: { r: [18, 27], p: [23] },
      34: { r: [24, 30], p: [18] },
      35: { r: [26, 30], p: [20, 21] },
      36: { r: [25, 26, 30], p: [12, 20, 23] },
      37: { r: [25, 26, 30], p: [20, 23] }
    },
    materias: {
      "1° Año": [
        { id: 1, nombre: "Análisis Matemático I" },
        { id: 2, nombre: "Álgebra y Geometría Analítica" },
        { id: 3, nombre: "Física I" },
        { id: 4, nombre: "Inglés I" },
        { id: 5, nombre: "Lógica y Estructuras Discretas" },
        { id: 6, nombre: "Algoritmos y Estructura de Datos" },
        { id: 8, nombre: "Sistemas y Procesos de Negocios" }
      ],
      "2° Año": [
        { id: 9, nombre: "Análisis Matemático II" },
        { id: 7, nombre: "Arquitectura de Computadoras" },
        { id: 10, nombre: "Física II" },
        { id: 11, nombre: "Ingeniería y Sociedad" },
        { id: 12, nombre: "Inglés II" },
        { id: 13, nombre: "Sintaxis y Semántica de los Lenguajes" },
        { id: 14, nombre: "Paradigmas de Programación" },
        { id: 15, nombre: "Sistemas Operativos" },
        { id: 16, nombre: "Análisis de Sistemas de Información" }
      ],
      "3° Año": [
        { id: 17, nombre: "Probabilidad y Estadística" },
        { id: 18, nombre: "Economía" },
        { id: 19, nombre: "Bases de Datos" },
        { id: 20, nombre: "Desarrollo de Software" },
        { id: 21, nombre: "Comunicación de Datos" },
        { id: 22, nombre: "Análisis Numérico" },
        { id: 23, nombre: "Diseño de Sistemas de Información" }
      ],
      "4° Año": [
        { id: 24, nombre: "Legislación" },
        { id: 25, nombre: "Ingeniería y Calidad de Software" },
        { id: 26, nombre: "Redes de Datos" },
        { id: 27, nombre: "Investigación Operativa" },
        { id: 28, nombre: "Simulación" },
        { id: 29, nombre: "Tecnología para la Automatización" },
        { id: 30, nombre: "Administración de Sistemas de Información" }
      ],
      "5° Año": [
        { id: 31, nombre: "Inteligencia Artificial" },
        { id: 32, nombre: "Ciencia de Datos" },
        { id: 33, nombre: "Sistemas de Gestión" },
        { id: 34, nombre: "Gestión Gerencial" },
        { id: 35, nombre: "Seguridad en los Sistemas de Información" },
        { id: 36, nombre: "Proyecto Final" },
        { id: 37, nombre: "Práctica Profesional Supervisada" }
      ],
      Electivas: [
        { nombre: "2 horas" },
        { nombre: "2 horas" },
        { nombre: "2 horas" },
        { nombre: "2 horas" },
        { nombre: "2 horas" },
        { nombre: "2 horas" },
        { nombre: "2 horas" },
        { nombre: "2 horas" },
        { nombre: "2 horas" },
        { nombre: "2 horas" }
      ]
    }
  },

  iq: {
    nombre: "Ingeniería Química",
    correlativas: {
      9: { r: [1, 6] },
      10: { r: [3, 4] },
      11: { r: [6] },
      12: { r: [3, 4] },
      13: { r: [4, 5] },
      14: { r: [6] },
      15: { r: [1, 2] },
      16: { r: [6, 7, 8, 9, 13], p: [1, 3, 4] },
      17: { r: [11, 12, 13], p: [4, 6] },
      18: { r: [12], p: [3, 4] },
      19: { r: [9, 11, 14], p: [1, 6] },
      20: { r: [9, 12, 13], p: [3, 4, 6] },
      21: { r: [9, 12, 13], p: [3, 4, 6] },
      22: { r: [10, 11, 14], p: [2, 6] },
      23: { r: [11, 14], p: [6] },
      24: { r: [9, 11, 13, 14], p: [1, 2, 6, 40] },
      25: { r: [16, 18], p: [7, 8, 9, 12, 41] },
      26: { r: [16, 17, 21], p: [9, 12, 13] },
      27: { r: [16, 17, 20, 21], p: [9, 12, 13] },
      28: { r: [9], p: [2, 3] },
      29: { r: [17, 20, 21], p: [9, 12, 13, 14] },
      30: { r: [16, 17, 20, 21], p: [11, 12, 14] },
      31: { r: [10], p: [4] },
      32: { r: [10], p: [2, 9, 15] },
      33: { r: [25, 29], p: [16, 18, 22] },
      34: { r: [9, 20], p: [5, 11, 19] },
      35: { r: [24, 26, 29, 30], p: [15, 16, 22] },
      36: { r: [16, 20, 21, 23], p: [9, 11, 14] },
      37: { r: [11, 14, 16], p: [9] },
      38: { r: [26], p: [9, 13] },
      39: { r: [25, 26, 27, 29, 30, 32], p: [16, 20, 21, 24, 28] },
      41: { r: [40] }
    },
    materias: {
      "1° Año": [
        { id: 1, nombre: "Introducción a la Ingeniería Química" },
        { id: 2, nombre: "Ingeniería y Sociedad" },
        { id: 3, nombre: "Álgebra y Geometría Analítica" },
        { id: 4, nombre: "Análisis Matemático I" },
        { id: 5, nombre: "Física I" },
        { id: 6, nombre: "Química" },
        { id: 7, nombre: "Sistemas de Representación" },
        { id: 8, nombre: "Fundamentos de Informática" }
      ],
      "2° Año": [
        { id: 9, nombre: "Introducción a Equipos y Procesos" },
        { id: 10, nombre: "Probabilidad y Estadística" },
        { id: 11, nombre: "Química Inorgánica" },
        { id: 12, nombre: "Análisis Matemático II" },
        { id: 13, nombre: "Física II" },
        { id: 14, nombre: "Química Orgánica" },
        { id: 15, nombre: "Legislación" },
        { id: 40, nombre: "Inglés I" }
      ],
      "3° Año": [
        { id: 16, nombre: "Balances de Masa y Energía" },
        { id: 17, nombre: "Termodinámica" },
        { id: 18, nombre: "Matemática Superior Aplicada" },
        { id: 19, nombre: "Ciencia de los Materiales" },
        { id: 20, nombre: "Fisicoquímica" },
        { id: 21, nombre: "Fenómenos de Transporte" },
        { id: 22, nombre: "Química Analítica" },
        { id: 23, nombre: "Microbiología y Química Biológica" },
        { id: 24, nombre: "Química Aplicada" },
        { id: 41, nombre: "Inglés II" }
      ],
      "4° Año": [
        { id: 25, nombre: "Diseño, Simulación, Optimización y Seguridad de Procesos" },
        { id: 26, nombre: "Operaciones Unitarias I" },
        { id: 27, nombre: "Tecnología de la Energía Térmica" },
        { id: 28, nombre: "Economía" },
        { id: 29, nombre: "Operaciones Unitarias II" },
        { id: 30, nombre: "Ingeniería de las Reacciones Químicas" },
        { id: 31, nombre: "Calidad y Control Estadístico de Procesos" }
      ],
      "5° Año": [
        { id: 32, nombre: "Organización Industrial" },
        { id: 33, nombre: "Control Automático de Procesos" },
        { id: 34, nombre: "Mecánica Industrial" },
        { id: 35, nombre: "Ingeniería Ambiental" },
        { id: 36, nombre: "Procesos Biotecnológicos" },
        { id: 37, nombre: "Higiene y Seguridad en el Trabajo" },
        { id: 38, nombre: "Máquinas e Instalaciones Eléctricas" },
        { id: 39, nombre: "Proyecto Final" }
      ],
      Electivas: [
        { nombre: "2 horas" },
        { nombre: "2 horas" },
        { nombre: "2 horas" },
        { nombre: "2 horas" },
        { nombre: "2 horas" },
        { nombre: "2 horas" },
        { nombre: "2 horas" },
        { nombre: "2 horas" },
        { nombre: "2 horas" },
        { nombre: "2 horas" }
      ]
    }
  },

  iem: {
    nombre: "Ingeniería Electromecánica",
    correlativas: {
      9: { r: [1, 3] },
      10: { r: [1, 3, 5] },
      11: { r: [1, 4, 5] },
      12: { r: [2] },
      13: { r: [1, 5] },
      14: { r: [1, 5] },
      15: { r: [1, 5] },
      17: { r: [9, 12], p: [1, 2, 3, 8] },
      18: { r: [9, 11, 13], p: [1, 3, 4, 5] },
      19: { r: [8, 10, 13], p: [1, 3, 5, 7] },
      20: { r: [9, 13], p: [1, 3, 5] },
      21: { r: [9], p: [1, 3] },
      22: { r: [1, 3], p: [1, 5] },
      23: { r: [9], p: [1, 2, 3, 6] },
      24: { r: [28], p: [9, 19, 21] },
      25: { r: [16] },
      26: { r: [9, 17, 18, 19], p: [10, 11, 12, 13, 14, 16] },
      27: { r: [20], p: [9, 13] },
      28: { r: [9, 19, 21, 22], p: [10, 13, 14] },
      29: { r: [20, 22], p: [9, 13] },
      30: { r: [20, 22], p: [9, 13] },
      31: { r: [21, 22], p: [9] },
      32: { r: [11], p: [6] },
      33: { r: [11], p: [6] },
      34: { r: [29, 30], p: [20, 22] },
      35: { r: [28, 31], p: [19, 21, 22] },
      36: { r: [26, 27, 28], p: [16, 17, 18, 22, 23] },
      37: { r: [27, 28, 29, 30], p: [19, 20, 21, 22] },
      38: { r: [27, 28, 29], p: [17, 18, 19, 20, 22, 23] },
      39: { r: [31, 32], p: [11, 15] },
      40: { r: [22, 26, 27, 28, 29], p: [19, 20, 21, 23] },
      41: { r: [25, 27, 28, 30], p: [17, 18, 19, 20, 21, 22, 23] }
    },

    materias: {
      "1° Año": [
        { id: 1, nombre: "Análisis Matemático I" },
        { id: 2, nombre: "Química General" },
        { id: 3, nombre: "Física I" },
        { id: 4, nombre: "Ingeniería Electromecánica I" },
        { id: 5, nombre: "Álgebra y Geometría Analítica" },
        { id: 6, nombre: "Ingeniería y Sociedad" },
        { id: 7, nombre: "Sistemas de Representación" },
        { id: 8, nombre: "Representación Gráfica" }
      ],
      "2° Año": [
        { id: 9, nombre: "Física II" },
        { id: 10, nombre: "Estabilidad" },
        { id: 11, nombre: "Ingeniería Electromecánica II" },
        { id: 12, nombre: "Conocimiento de Materiales" },
        { id: 13, nombre: "Análisis Matemático II" },
        { id: 14, nombre: "Programación en Computación" },
        { id: 15, nombre: "Probabilidad y Estadística" },
        { id: 16, nombre: "Inglés I" }
      ],
      "3° Año": [
        { id: 17, nombre: "Matemática para Ingeniería Electromecánica" },
        { id: 18, nombre: "Tecnología Mecánica" },
        { id: 19, nombre: "Ingeniería Electromecánica III" },
        { id: 20, nombre: "Mecánica y Mecanismos" },
        { id: 21, nombre: "Electrotecnia" },
        { id: 22, nombre: "Termodinámica Técnica" },
        { id: 23, nombre: "Higiene y Seguridad Industrial" },
        { id: 25, nombre: "Inglés II" }
      ],
      "4° Año": [
        { id: 26, nombre: "Elementos de Máquinas" },
        { id: 27, nombre: "Electrónica Industrial" },
        { id: 28, nombre: "Mecánica de los Fluidos y Máquinas Fluidodinámicas" },
        { id: 29, nombre: "Máquinas Eléctricas" },
        { id: 30, nombre: "Mediciones Eléctricas" },
        { id: 31, nombre: "Máquinas Térmicas" },
        { id: 33, nombre: "Legislación" }
      ],
      "5° Año": [
        { id: 34, nombre: "Redes de Distribución e Instalaciones" },
        { id: 35, nombre: "Instalaciones Térmicas y Mecánicas" },
        { id: 36, nombre: "Máquinas y Equipos de Transporte" },
        { id: 37, nombre: "Centrales y Sistemas de Transmisión" },
        { id: 38, nombre: "Gestión y Mantenimiento Electromecánico" },
        { id: 39, nombre: "Organización Industrial" },
        { id: 40, nombre: "Automatización y Control Industrial" },
        { id: 24, nombre: "Oleohidráulica y Neumática" },
        { id: 41, nombre: "Proyecto Final" }
      ],
      Electivas: [
        { nombre: "2 horas" },
        { nombre: "2 horas" },
        { nombre: "2 horas" },
        { nombre: "2 horas" },
        { nombre: "2 horas" },
        { nombre: "2 horas" },
        { nombre: "2 horas" },
        { nombre: "2 horas" },
        { nombre: "2 horas" },
        { nombre: "2 horas" }
      ]
    }
  }
};

