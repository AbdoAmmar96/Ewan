import SiteLayout from '../Layouts/SiteLayout';
import { StatsBand, CtaBand } from '../Components/Bits';
import Projects from '../Components/Projects';
import Testimonials from '../Components/Testimonials';
import { PageHero } from '../Components/Pieces';

export default function ProjectsPage() {
  return (
    <SiteLayout
      title="أعمالنا — إيوان للمصاعد"
      description="مشاريع مصاعد سلّمتها إيوان في مباني سكنية وتجارية وفنادق ومستشفيات حول مصر."
    >
      <PageHero eyebrow="أعمالنا" title="مشاريع نفخر بها" sub="أكثر من 1200 مصعد نفّذناه في مباني سكنية وتجارية وفنادق ومستشفيات حول مصر." current="أعمالنا" />
      <Projects withFilters hideHead bg="bg-cream" />
      <StatsBand />
      <Testimonials bg="bg-cream2" />
      <CtaBand title="هل يكون مشروعك القادم معنا؟" sub="من أول معاينة حتى التسليم، فريق إيوان معك خطوة بخطوة." />
    </SiteLayout>
  );
}
