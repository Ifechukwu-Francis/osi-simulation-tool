import { S } from './components/light';

const Footer = () => {
  return (
    <footer style={S.footer}>
      <div style={S.footerContainer}>
        <div style={S.footerContentBox}>
          <p style={S.footerText}>
            © {new Date().getFullYear()} OSI Model Simulator - Interactive Educational Tool
          </p>
          <p style={S.footerSubtext}>
            Understanding how data travels across networks
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;