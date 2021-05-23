/*
 * @Description: footer组件
 * @Author: tangyincheng
 */
import '../public/style/components/footer.css'

const Footer = () => (
  <div className="footer-div">
    <div>Copyright © 2020 tangyincheng 基于nextjs、eggjs、ant Design</div>
    {/* <div>基于nextjs、egjs、ant Design</div> */}
    <div>
      <a href="http://beian.miit.gov.cn/" target="_blank" style={{ color: '#007ca3' }}>
        蜀ICP备2021009699号-1
      </a>
    </div>
  </div>
)

export default Footer
