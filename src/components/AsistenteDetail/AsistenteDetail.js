import React, { useState, useEffect } from 'react';

import { solicitarFirma, getDNIImagenes, getFirmaEstatusText } from '../../services/constituciones';
import RoundedButton from '../RoundedButton';

import './AsistenteDetail.scss';

const getAsistenteAdddress = asistente => {
  if (!asistente.DatosAmpliados || !asistente.DatosAmpliados.Direccion) return '';

  const direccion = asistente.DatosAmpliados.Direccion;
  
  return `${direccion.TipoVia} ${direccion['NombreVia ']} ${direccion.Numero || ''} ${direccion['CP ']} ${direccion.Municipio}`;
}

const getAsistenteFechaNacimiento = asistente => {
  const fechaSplitted = asistente.FechaNacimiento.split(' ');
  return fechaSplitted[0];
}

const AsistenteDetail = ({ asistente, statusFirma, onBack, onNext, onPrev, asistenteIndex, asistentesCount }) => {
  const [imagenesDNI, setImagenesDNI] = useState([]);

  useEffect(() => {
    const fetchImagenes = async () => {
      const imagenes = await getDNIImagenes(asistente.NumeroDocumento);
      if (imagenes && imagenes.length) {
        setImagenesDNI(imagenes);
      }
    }
    // asistente && asistente.NumeroDocumento && fetchImagenes();
  }, [asistente]);

  const handleRequestSign = () => {
    solicitarFirma(asistente.NumeroDocumento);
  }

  if (!asistente) return null;

  const statusText = getFirmaEstatusText(statusFirma);

  return (
    <div className="asistente-detail">
      <div className="asistente-detail-top">
        <div className="asistente-detail-top-info">
          <RoundedButton onClick={onBack} icon="back"/>
          <div className="top-title">Detalle del asistente</div>
        </div>
        <div className="asistente-detail-top-buttons">
          <RoundedButton icon="prev" onClick={onPrev} disabled={asistenteIndex < 1}/>
          <div>{asistenteIndex + 1} / {asistentesCount}</div>
          <RoundedButton icon="next" onClick={onNext} disabled={asistenteIndex === asistentesCount - 1}/>
        </div>
      </div>
      <div className="asistente-detail-section name-section">
        {asistente.Nombre} - {asistente.Apellido1} - {asistente.Apellido2}
      </div>
      <div className="asistente-detail-section dni-section">
        <div>Documento: {asistente.NumeroDocumento}</div>
        <div className="dni-section-extra">Fecha de nacimiento: {getAsistenteFechaNacimiento(asistente)}</div>
        <div className="dni-section-extra">Dirección: {getAsistenteAdddress(asistente)}</div>
        <div className="status-section">
          <div className={`asistente-status ${statusFirma ? `estado-${statusFirma.estado}` : 'estado-0'}`}>
            {statusText}
          </div>
        </div>
      </div>
      <div className="asistente-detail-section pictures-section">
        <div>DNI:</div>
        {imagenesDNI.map(imagen => (
          <div className="dni-picture">
            <img src={imagen} alt="" />
          </div>
        ))}
      </div>
      <div className="asistente-bottom">
        <button className="app-button" onClick={handleRequestSign}>Solicitar firma</button>
      </div>
    </div>
  );
}
 
export default AsistenteDetail;
