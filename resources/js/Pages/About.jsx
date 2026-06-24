import SiteLayout from '../Layouts/SiteLayout';
import { Link } from '@inertiajs/react';
import { SecHead, StatsBand, CtaBand } from '../Components/Bits';
import { Icon } from '../Components/Icon';
import { Process, WhyGrid } from '../Components/Process';
import { PageHero, ValuesCards, TeamGrid, Checklist } from '../Components/Pieces';
import { scene } from '../site';

export default function About() {
  return (
    <SiteLayout
      title="من نحن — إيوان للمصاعد"
      description="إيوان شركة مصاعد مصرية بخبرة 15 سنة في توريد وتركيب وصيانة المصاعد. تعرّف على قصتنا وفريقنا وقيمنا."
    >
      <PageHero eyebrow="من نحن" title="شركة إيوان للمصاعد" sub="بدأنا بهدف واحد: أن نجعل تركيب المصاعد في مصر تجربة واضحة وآمنة، دون لفّ ولا دوران." current="من نحن" />

      <section className="sec bg-cream">
        <div className="container">
          <div className="split">
            <div className="split-img" data-reveal="left">
              <div className="ph" style={scene('shaft', 'a')} />
              <div className="frame" />
              <div className="exp-badge"><div className="big lat">15+</div><div className="sm">سنة في عالم المصاعد</div></div>
            </div>
            <div data-reveal="right">
              <span className="eyebrow">قصتنا</span>
              <h2 className="h-lg" style={{ margin: '14px 0 18px' }}>نبني ثقة، لا مصاعد فحسب</h2>
              <p className="lead" style={{ marginBottom: '14px' }}>
                إيوان شركة مصاعد مصرية، عملنا على مدار سنين في توريد وتركيب وصيانة المصاعد لمباني سكنية وتجارية وفنادق ومستشفيات. ونتعامل مع كل مشروع كأننا نركّبه في مبنانا نحن.
              </p>
              <p className="muted" style={{ marginBottom: '8px' }}>
                نركّز على أمرين: الأمان، والوضوح. لا تكاليف مخفية ولا وعود لا تتحقق — عرض سعر واضح، وتسليم في الموعد، وصيانة بعد التركيب تطمئنك.
              </p>
              <Checklist />
              <div style={{ marginTop: '30px' }}>
                <Link href="/contact" className="btn">تواصل معنا <Icon name="arrow" /></Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <StatsBand />

      <section className="sec bg-cream2">
        <div className="container">
          <SecHead eyebrow="مبادئنا" title="ما يحرّك عملنا" center />
          <ValuesCards />
        </div>
      </section>

      <section className="sec bg-cream">
        <div className="container">
          <SecHead eyebrow="لماذا إيوان" title="ما يميّزنا عن غيرنا" />
          <WhyGrid />
        </div>
      </section>

      <Process bg="bg-cream2" />

      <section className="sec bg-cream">
        <div className="container">
          <SecHead eyebrow="فريقنا" title="فريق يتقن عمله" sub="مهندسون وفنيون يملكون سنين خبرة في كل تفصيلة." center />
          <TeamGrid />
        </div>
      </section>

      <CtaBand />
    </SiteLayout>
  );
}
