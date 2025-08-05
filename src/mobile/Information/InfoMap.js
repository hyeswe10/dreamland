
const InfoMap = () => {
  return (
    <div className="info-map">
      <div className="map-content">
        <img src={`${process.env.PUBLIC_URL}/images/info-map.png`} />
      </div>
      <img src={`${process.env.PUBLIC_URL}/images/info-background.png`}/>
    </div>
  );
};

export default InfoMap;