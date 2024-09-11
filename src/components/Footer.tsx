const Footer: React.FC = () => {
  return (
    <footer
      style={{
        width: "100%",
        height: "10vh",
      }}
      className="d-flex justify-content-center align-items-center bg-dark"
    >
      <p className="text-white">{new Date().getFullYear()}</p>
    </footer>
  );
};

export default Footer;
