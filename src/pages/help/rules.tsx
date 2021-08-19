import { Typography } from 'antd';
const { Title, Paragraph } = Typography;
import React from 'react';
import HelpLayout from '../../components/HelpLayout';

export default function RulesPage() {
  return (
    <HelpLayout>
      <Typography>
        <Title>用户守则</Title>
        BOOKSTORE 上的商品由 BOOKSTORE 或其关联公司或第三方卖家销售。如果您在 BOOKSTORE 购物，您便接受了以下交易条款。请仔细阅读这些条款。当您使用 BOOKSTORE
        目前或将来提供的服务（例如，我的账户、礼品卡、VIP会员、商店街等）时，您同时应接受适用于那些服务的条款、准则和条件（“特殊条款”）；如果以下交易条款与特殊条款有不一致之处，则以特殊条款为准。通过在
        BOOKSTORE 购买商品和/或使用其提供的服务，您同意接受本交易条款和所有有关的政策、条件和准则的约束。如果您不同意本交易条款中的任何一条，您可以选择不在
        BOOKSTORE 购买商品或接受服务。
        <Title level={2}>1. BOOKSTORE 账户</Title>
        <Paragraph>
          您注册成功后， BOOKSTORE 将为您开通一个账户，作为您在 BOOKSTORE 交易及使用 BOOKSTORE
          服务时的唯一身份标识，该账户的登录名和密码由您负责保管。您保证在使用 BOOKSTORE 过程中，遵守诚实信用原则，不利用 BOOKSTORE
          账户进行牟利性经营活动，不采取不正当竞争行为，不扰乱网上交易的正常秩序，不从事与网上交易无关的行为。您同意并确认， BOOKSTORE
          有权对您是否违反上述承诺做出单方认定，并根据单方认定结果适用相关规则予以处理或终止向您提供服务。用户在申请使用 BOOKSTORE
          服务时，必须准确提供必要的资料，如资料有任何变动，请在 BOOKSTORE 及时更新。
        </Paragraph>
        <Title level={2}>2. 合同的订立</Title>
        <Paragraph>
          BOOKSTORE
          站上的商品图片展示、说明和价格构成要约邀请。如果您通过我们网站订购产品，您的订单就成为一种购买产品的申请或要约。您下单购买支付货款后，我们双方的合同立即成立，我们将会向您发出通知发货的邮件。对于
          BOOKSTORE 数字商品而言，由于其载体的特殊性，我们将不会向您发出通知发货的邮件，在您订购数字商品并支付相应价款后，关于数字商品的合同即成立。
          在下订单的同时，您也同时承认了您拥有购买这些产品的权利能力和行为能力，并且您对您在订单中提供的所有信息的真实性负责。
        </Paragraph>
        <Title level={2}>3. 产品说明</Title>
        <Paragraph>
          BOOKSTORE 努力使产品说明尽可能准确。不过，我们并不保证产品说明或 BOOKSTORE 的其他内容是准确的、完整的、可靠的、最新的或无错误的。如果 BOOKSTORE
          提供的产品本身并非如说明所说，您唯一的救济是将该未经使用过的产品退还我们。
        </Paragraph>
        <Title level={2}>4. 版权声明</Title>
        <Paragraph>
          BOOKSTORE 上的所有内容诸如文字、图表、标识、按钮图标、图像、声音文件片段、数字下载、数据编辑和软件、商标都是 BOOKSTORE
          或其内容提供者的财产，受中国和国际版权法的保护。未经 BOOKSTORE 书面授权或许可，不得以任何目的对 BOOKSTORE
          或其任何部分进行复制、复印、仿造、出售、转售、访问、或以其他方式加以利用。
        </Paragraph>
        <Title level={2}>5. 隐私声明</Title>
        <Paragraph>
          BOOKSTORE 不会向任何第三方披露、转让、出租或者出售交易用户名单、交易记录等涉及消费者个人信息的数据以及您保存在 BOOKSTORE
          各项服务中的非公开内容，除非您明确授权 BOOKSTORE ，或 BOOKSTORE 在诚信基础上认为透露这些信息是必要的。您了解并同意， BOOKSTORE
          有权根据相应法律法规的要求，或应政府部门（包括司法及行政部门）的要求，向其提供您在 BOOKSTORE
          填写的注册信息和交易纪录等必要信息。如您涉嫌侵犯他人知识产权，则 BOOKSTORE 亦有权在初步判断涉嫌侵权行为存在的情况下，向权利人提供您必要的身份信息。
        </Paragraph>
        <Title level={2}>6. 责任限制和不可抗力</Title>
        <Paragraph>
          不论在任何情况下， BOOKSTORE
          均不对由于互联网正常的设备维护，互联网络连接故障，电脑、通讯或其他系统的故障，电力故障，罢工，暴乱，骚乱，火灾、洪水、风暴，爆炸，战争，政府行为，司法行政机关的命令或第三方的不作为而造成的不能履行或延迟履行承担责任。
        </Paragraph>
        <Title level={2}>7.适用的法律和管辖权</Title>
        <Paragraph>
          您和 BOOKSTORE
          之间的契约将适用中华人民共和国的法律，如缔约方就本协议内容或其执行发生任何争议，双方应尽力友好协商解决；协商不成时，任何一方均应当向有管辖权的法院提起诉讼。
        </Paragraph>
      </Typography>
    </HelpLayout>
  );
}
