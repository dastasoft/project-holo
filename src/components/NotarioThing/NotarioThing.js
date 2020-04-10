import React from "react";
import AsistentesList from "../AsistentesList";
import AsistenteDetail from "../AsistenteDetail";

const NotarioThing = () => {
  const [asistente, setAsistente] = useState(null);
  const [asistenteIndex, setAsistenteIndex] = useState(null);
  const [statusFirmas, setStatusFirmas] = useState([]);

  const [data, loading, error] = useFetchData(getCita);

  useEffect(() => {
    const checkSignStatuses = async () => {
      const status = await estadoFirmas();
      console.log("checkSignStatuses -> status", status);
      setStatusFirmas(status.data);
    };
    const intervalHandler = setInterval(checkSignStatuses, 2000);
    return () => clearInterval(intervalHandler);
  }, []);

  const handleSelectAsistente = (index) => {
    setAsistenteIndex(index);
    setAsistente(data.Participantes[index]);
  };

  const handleBack = () => {
    setAsistenteIndex(-1);
    setAsistente(null);
  };

  const handleNextAsistente = () => {
    if (asistenteIndex < data.Participantes.length - 1) {
      handleSelectAsistente(asistenteIndex + 1);
    }
  };

  const handlePrevAsistente = () => {
    if (asistenteIndex > 0) {
      handleSelectAsistente(asistenteIndex - 1);
    }
  };

  if (loading) return renderLoading();
  if (error) return renderError();

  return (
    <div className="zoom-asistentes">
      <div
        className={`asistentes-slide ${asistente === null ? "current" : ""}`}
      >
        <AsistentesList
          asistentes={data.Participantes}
          statusFirmas={statusFirmas}
          onSelectAsistente={handleSelectAsistente}
        />
      </div>
      <div
        className={`asistentes-slide ${asistente !== null ? "current" : ""}`}
      >
        {asistente && (
          <AsistenteDetail
            asistente={asistente}
            statusFirma={getFirmaEstatus(
              statusFirmas,
              asistente.NumeroDocumento
            )}
            asistenteIndex={asistenteIndex}
            asistentesCount={data.Participantes.length}
            onNext={handleNextAsistente}
            onPrev={handlePrevAsistente}
            onBack={handleBack}
          />
        )}
      </div>
    </div>
  );
};

export default NotarioThing;
