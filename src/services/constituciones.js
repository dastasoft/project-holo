import axios from 'axios';

const { REACT_APP_REST_CONTEXT, REACT_APP_TOKEN_LOCALSTORAGE } = process.env;

//const BASE_URL = `${REACT_APP_REST_PROTOCOL}://${REACT_APP_REST_HOST}`;
const BASE_API = REACT_APP_REST_CONTEXT;

const TOKEN_MOCK =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOm51bGwsImlzcyI6IkJyOTFNemZkU01hOEZqUEFjWlAyTFEiLCJleHAiOjE1ODQ5NTc3MzIsImlhdCI6MTU4NDM1MjkzMn0.n5yd2l-PELbE4BOxMAZA7R5S0GpW_E8E3cNmAP8k6AE';

const params = new URLSearchParams(window.location.search);
const ID_TRAMITE = params.get('id-cita');

async function getToken() {
  return TOKEN_MOCK;

  // const result = await apiCall('get', `accesosigno/j_hard_check?CID=12612c9d4f1f71a501f686be15d17ada&codCatastro=000000005`);
  // if (result && result.success) {
  //   localStorage.setItem(REACT_APP_TOKEN_LOCALSTORAGE, result.data);
  //   return result.data;
  // }
  // return '';
}

function getCurrentToken() {
  const token = localStorage.getItem(REACT_APP_TOKEN_LOCALSTORAGE) || '';
  if (token) return token;

  return getToken();
}

function parseResponse(data) {
  return {
    success: true,
    data
  };
}

function parseError(error) {
  return {
    success: false,
    ...error
  };
}

async function apiCallAuth(method, url, params, data) {
  const token = await getCurrentToken();
  if (!token) return parseError('no-token');

  try {
    const response = await axios({
      method,
      url,
      data,
      params,
      headers: { Authorization: `Bearer ${token}` }
    });
    if (response.status === 200) {
      return parseResponse(response.data);
    }
    return parseError(response);
  } catch (err) {
    return parseError(err);
  }
}

async function apiCall(method, url, params, data) {
  try {
    const response = await axios[method](url, params);
    if (response.status === 200) {
      return parseResponse(response.data);
    }
    return parseError(response);
  } catch (err) {
    return parseError(err);
  }
}

async function apiGet(url, params) {
  return apiCallAuth('get', url, params);
}

async function apiPost(url, params, data) {
  return apiCallAuth('post', url, params, data);
}

export function getCita() {
  return parseResponse(RESPONSE_CITA);
  //return apiGet(`${BASE_API}/acciones/info/cita/${ID_TRAMITE}`);
}

export function getDNIImagenes(documento) {
  return apiGet(`${BASE_API}/personas/numeroDocumento/${documento}/imagen`);
}

export function estadoFirmas() {
  return parseResponse(RESPONSE_STATUS);
  //return apiGet(`${BASE_API}/tramites/${ID_TRAMITE}/firma/estados`);
}

export function uploadDocumento(documento) {
  return apiPost(`${BASE_API}/tramites/${ID_TRAMITE}/documentos`, {}, { data: documento });
}

export function solicitarFirma(documento) {
  return apiPost(
    `${BASE_API}/tramites/${ID_TRAMITE}/firma`,
    {},
    {
      data: {
        // cuv: "string",
        // catastro: "string",
        nif: documento
        // protocolo: "string",
        // protocoloBis: "string",
        // fechaAutorizacion: "string"
      }
    }
  );
}

// UTILS
export function getFirmaEstatus(estatus, numeroDocumento) {
  const statusFiltered = estatus.data ? estatus.data.filter(status => status.NumeroDocumento === numeroDocumento) : [];
  return statusFiltered && statusFiltered[0] ? statusFiltered[0] : 0;
}

export function getFirmaEstatusText(estado) {
  if (!estado) return 'No enviada';
  const estados = ['No enviada', 'Pendiente de firma', 'Firmada'];
  return estados[estado.estado];
}

const RESPONSE_CITA = {
  success: true,
  errorType: null,
  code: '200',
  errorMessage: null,
  data: {
    IdZoom: 864212068,
    'IdTramite ': 11138,
    TipoTramite: 'Constitución de sociedades',
    FechaSolicitud: '28/02/2020 13:01',
    EstadoTramite: {
      'IdEstadoTramite ': 2,
      descripcion: 'En curso'
    },
    'EstadoTipoTramite ': {
      'IdEstadoTipoTramite ': 18,
      desc: 'Solicitud enviada'
    },
    Modalidad: {
      idModalidad: 'PROP',
      desc: 'Propio'
    },
    Cita: {
      idCita: 175240,
      Tipo: 'Firma',
      SubTipo: 'Constitución de sociedades',
      FechaInicial: '05/03/2020 09:15',
      FechaFinal: '2020-03-05 09:15:00.0',
      CUV: '9900005',
      CodigoCatastro: '000000005'
    },
    BorradorConfirmado: 'false',
    CodigoActoJuridico: 'CONSTITUCIÓN DE SOCIEDAD LIMITADA',
    Solicitante: {
      IdUsuarioRol: 11030,
      CodigoRol: 0,
      DescripcionRol: 'CIUDADANO',
      PersonaFisica: {
        IdBolaPF: 2100408000,
        NumeroDocumento: '35303157C',
        Nombre: 'JUAN',
        Apellido1: 'RIBERA',
        Apellido2: 'SÁEZ'
      }
    },
    ConstitucionSociedades: {
      IdConstitucionSociedad: 11139,
      FormaSocial: 1,
      Tipologia: 1,
      ObjetoSocial: 'ppppp',
      CapitalSocial: 10000,
      NumeroParticipaciones: 10,
      ValorNominal: 1000,
      IdSistemaAdministracion: 1,
      RetribucionAdministrador: 1,
      PorcentajeRetribucionAdministrador: 0,
      ComentariosNombramientoCargos: '',
      CertificacionBancaria: 3,
      DuracionLimitada: 'true',
      FechaDuracionHasta: '',
      FechaCierreEjercicio: '31/12/1970 00:00',
      SolicitudDenominacionSocial: 'true',
      Denominaciones: {
        Denominacion1: 'pppppppp',
        Denominacion2: '',
        Denominacion3: '',
        Denominacion4: '',
        Denominacion5: ''
      },
      WebCorporativa: '',
      AportacionDineraria: 'true',
      ObservacionesAportacion: '',
      DomicilioSocial: {
        'IdDireccion ': 11137,
        TipoVia: 'CR',
        'NombreVia ': 'pppppp',
        IneProvincia: '08',
        IneMunicipio: '2055',
        Provincia: 'Barcelona',
        Municipio: 'Sant Cugat del Vallès',
        'CP ': '08174'
      }
    },
    Participantes: [
      {
        IdParticipante: 11136,
        'IdTipoIntervencion ': 20,
        TipoIntervencion: 'Socio',
        TipoDocumento: 'Documento de identificación NIF',
        NumeroDocumento: '35303157C',
        Nombre: 'JUAN',
        Apellido1: 'RIBERA',
        Apellido2: 'SÁEZ',
        FechaNacimiento: '04/05/1960 00:00',
        IdEstadoCivil: 1,
        Profesion: '19',
        DatosAmpliados: {
          IdDatosAmpliados: 11135,
          Genero: 'M',
          Nacionalidad: 'ESP',
          Telefono: '682491292',
          Email: 'portalnotarial@notariado-i.org',
          Direccion: {
            'IdDireccion ': 11134,
            TipoVia: 'CL',
            'NombreVia ': "\\\";alert('XSS');//",
            IneProvincia: '08',
            IneMunicipio: '0193',
            Provincia: '08',
            Municipio: 'Barcelona',
            CodigoPais: 'ESP',
            'CP ': '08005'
          }
        }
      },
      {
        IdParticipante: 11136,
        'IdTipoIntervencion ': 12,
        TipoIntervencion: 'Representante',
        TipoDocumento: 'Documento de identificación NIF',
        NumeroDocumento: '35303157C',
        Nombre: 'JUAN',
        Apellido1: 'RIBERA',
        Apellido2: 'SÁEZ',
        FechaNacimiento: '04/05/1960 00:00',
        IdEstadoCivil: 1,
        Profesion: '19',
        DatosAmpliados: {
          IdDatosAmpliados: 11135,
          Genero: 'M',
          Nacionalidad: 'ESP',
          Telefono: '682491292',
          Email: 'portalnotarial@notariado-i.org',
          Direccion: {
            'IdDireccion ': 11134,
            TipoVia: 'CL',
            'NombreVia ': "\\\";alert('XSS');//",
            IneProvincia: '08',
            IneMunicipio: '0193',
            Provincia: '08',
            Municipio: 'Barcelona',
            CodigoPais: 'ESP',
            'CP ': '08005'
          }
        }
      }
    ],
    Relaciones: [],
    Documento: [
      {
        IdDocumentoTramite: 11148,
        IdDocumento: 11147,
        TipoDocumento: 'Borrador del trámite creado por el notario',
        Nombre: 'prueba2.pdf',
        MimeType: 'application/pdf',
        FechaCreacion: '06/03/2020 12:59',
        BFile_Id: 1034
      },
      {
        IdDocumentoTramite: 11143,
        IdDocumento: 11142,
        TipoDocumento: 'Borrador del trámite creado en el portal',
        Nombre: 'BORRADOR_ESTATUTOS.pdf',
        MimeType: 'application/pdf',
        FechaCreacion: '28/02/2020 13:01',
        BFile_Id: 1031
      },
      {
        IdDocumentoTramite: 11145,
        IdDocumento: 11144,
        TipoDocumento: 'Solicitud del trámite',
        Nombre: 'solicitudConstitucionSociedades.pdf',
        MimeType: 'application/pdf',
        FechaCreacion: '28/02/2020 13:01',
        BFile_Id: 1032
      }
    ]
  }
};

const RESPONSE_STATUS = {
  success: true,
  errorType: null,
  code: '200',
  errorMessage: null,
  data: [
    {
      estado: 0,
      IdParticipante: null,
      NumeroDocumento: null,
      FirmaNotario: true
    }
  ]
};
