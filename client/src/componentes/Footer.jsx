import { FaGithub, FaEnvelope, FaLinkedin } from 'react-icons/fa';
import styles from './Footer.module.css'
const Footer = () => {
  return (
    
      <div className={styles.social_links}>
        
        <a href="mailto:fedealdama.fa@gmail.com">
          <FaEnvelope />
        </a>
        <a href="https://www.linkedin.com/in/federico-daniel-aldama-mongelos-41360a205">
          <FaLinkedin />
        </a>
        <a href="https://github.com/AdicTX">
          <FaGithub />
        </a>
      </div>
   
  );
}
export default Footer;