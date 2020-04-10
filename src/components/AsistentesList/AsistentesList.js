import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';

import {
  getFirmaEstatus,
  getFirmaEstatusText,
  solicitarFirma,
  uploadDocumento
} from '../../services/constituciones';
import { toBase64 } from '../../services/files';
import RoundedButton from '../RoundedButton';

import './AsistentesList.scss';

const AsistentesList = ({ asistentes, statusFirmas, onSelectAsistente }) => {
  const [documento, setDocumento] = useState({});
  const [documentoReady, setDocumentoReady] = useState(false);
  const { register, handleSubmit, errors, setValue } = useForm();

  useEffect(() => {
    register({ name: 'documento' }, { required: true });
  }, [register]);

  const onSubmit = async data => {
    const result = uploadDocumento(data);
    if (result.success) {
      setDocumentoReady(true);
    }
  };

  const handleDownloadDocument = () => {};

  const handleSendToSign = (event, documento) => {
    event.stopPropagation();
    event.preventDefault();
    solicitarFirma(documento);
  };

  const handleDocumentUpload = async event => {
    debugger;
    const files = event.target.files || null;

    if (files && files[0]) {
      const documentoEncoded = await toBase64(files[0]);
      setValue('documento', documentoEncoded);
      setDocumento(files[0]);
    }
  };

  return (
    <>
      <div className="document-section">
        <div className="top-title">DOCUMENTO</div>
        {documentoReady ? (
          <div className="document-uploaded">
            <span>Descargar: {documento.name}</span>
            <RoundedButton icon="download" onClick={handleDownloadDocument} />
          </div>
        ) : (
          <div className="document-form">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-row">
                <div className="form-field">
                  <label htmlFor="numeroDocumento">Número de documento</label>
                  <input
                    className={errors.numeroDocumento && 'input-error'}
                    placeholder={
                      errors.numeroDocumento ? 'Campo obligatorio' : '12345678Z'
                    }
                    type="text"
                    name="numeroDocumento"
                    id="numeroDocumento"
                    ref={register({ required: true })}
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="bis">Bis</label>
                  <input
                    className={errors.bis && 'input-error'}
                    placeholder={errors.bis ? 'Campo obligatorio' : '12345678Z'}
                    type="text"
                    name="bis"
                    id="bis"
                    ref={register({ required: true })}
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-field">
                  <label htmlFor="fechaAutorizacion">
                    Fecha de autorización
                  </label>
                  <input
                    className={errors.fechaAutorizacion && 'input-error'}
                    placeholder={
                      errors.fechaAutorizacion
                        ? 'Campo obligatorio'
                        : '01-01-2020'
                    }
                    type="date"
                    name="fechaAutorizacion"
                    id="fechaAutorizacion"
                    ref={register({ required: true })}
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="notarioAutorizante">
                    Notario autorizante
                  </label>
                  <input
                    className={errors.notarioAutorizante && 'input-error'}
                    placeholder={
                      errors.notarioAutorizante
                        ? 'Campo obligatorio'
                        : '12345678Z'
                    }
                    type="text"
                    name="notarioAutorizante"
                    id="notarioAutorizante"
                    ref={register({ required: true })}
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-field">
                  <label htmlFor="documento">Documento</label>
                  <div
                    className={`fake-input ${
                      errors.documento ? 'input-error' : ''
                    }`}
                  >
                    {documento.name ? documento.name : 'Subir archivo'}
                    <input
                      type="file"
                      name="documento"
                      id="documento"
                      onChange={handleDocumentUpload}
                    />
                  </div>
                </div>
                <div className="form-field">
                  <label>&nbsp;</label>
                  <button className="app-button">Enviar</button>
                </div>
              </div>
            </form>
          </div>
        )}
      </div>
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
      </div>
      <div className="asistentes-bottom">
        <button className="app-button">Firma Notario</button>
      </div>
    </>
  );
};

export default AsistentesList;
