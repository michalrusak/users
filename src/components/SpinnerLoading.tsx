import Spinner from "react-bootstrap/Spinner";

const SpinnerLoading = () => {
  return (
    <div className="d-flex align-items-center justify-content-center">
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );
};

export default SpinnerLoading;
