import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';

import {
  getFirmaEstatus,
  getFirmaEstatusText,
  solicitarFirma
} from '../../services/constituciones';
import RoundedButton from '../RoundedButton';

import './AsistentesList.scss';

const AsistentesList = ({ asistentes, statusFirmas, onSelectAsistente }) => {
  const handleDownloadDocument = () => {};

  const handleSendToSign = (event, documento) => {
    event.stopPropagation();
    event.preventDefault();
    solicitarFirma(documento);
  };

  return (
    <div className="asistentes-list">
      <div className="top-title">INTERVINIENTES</div>
      {asistentes &&
        asistentes.map((asistente, index) => {
          const statusFirma = getFirmaEstatus(
            statusFirmas,
            asistente.NumeroDocumento
          );
          const statusFirmaText = getFirmaEstatusText(statusFirma);

          return (
            <div
              key={`${index}-${asistente.NumeroDocumento}`}
              className="asistentes-list-item"
              role="button"
              onClick={() => onSelectAsistente(index)}
            >
              <div className="asistentes-list-item-info">
                <div className="asistentes-list-item-name">
                  {asistente.Nombre}
                </div>
                <div className="asistentes-list-item-lastname">
                  {asistente.Apellido1} {asistente.Apellido2}
                </div>
                <div className="asistentes-list-item-id">
                  Documento: {asistente.NumeroDocumento}
                </div>
              </div>
              <div className="asistentes-list-item-status">
                <div
                  className={`asistente-status ${
                    statusFirma ? `estado-${statusFirma.estado}` : 'estado-0'
                  }`}
                >
                  {statusFirmaText}
                </div>
              </div>
              <div className="asistentes-list-item-actions">
                {statusFirma === 0 && (
                  <RoundedButton
                    icon="sign"
                    onClick={event =>
                      handleSendToSign(event, asistente.NumeroDocumento)
                    }
                  />
                )}
                {statusFirma > 1 && (
                  <RoundedButton
                    icon="download"
                    onClick={handleDownloadDocument}
                  />
                )}
              </div>
            </div>
          );
        })}
      <div className="asistentes-bottom">
        <button className="app-button">Firma Notario</button>
      </div>
    </div>
  );
};

export default AsistentesList;
