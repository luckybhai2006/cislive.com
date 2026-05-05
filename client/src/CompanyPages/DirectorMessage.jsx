import Container from "../components/UI/Container";
import Card from "../components/UI/Card";
import PageHero from "../components/pages/PageHero";
import CompanyCTA from "../components/pages/CompanyCTA";
import directorHero from "../assets/director.webp";

export default function DirectorMessage() {
  return (
    <>
      <PageHero
        title="Director Message"
        subtitle="A note on how we think about partnership, delivery quality, and building dependable technology for logistics teams."
        image={directorHero}
      />

      <section className="bg-white py-12 sm:py-16">
        <Container>
          <Card className="rounded-3xl border border-line bg-white p-6 shadow-md sm:p-10">
            <div className="text-xl font-extrabold tracking-tight text-ink">
              A message from the managing director
            </div>
            <div className="mt-4 space-y-4 text-sm font-semibold leading-relaxed text-muted sm:text-base">
              <p>
                We are extremely delighted to introduce you to VCISLIVE
                Technologies From its humble origin in 2010, VCISLIVE has
                emerged to a highly versatile provider of a comprehensive suite
                of web related services, with a performance driven approach and
                a solid client portfolio. Thanks to our capability to
                acclimatize with dynamic technologies while keeping the unique
                needs of our esteemed clients at the forefront of the company’s
                focus.
              </p>
              <p>
                Our overall business strength is shaped by our core strategies
                and values, wherein we strive to uphold the competence and
                excellence level of our services by giving equal importance to
                all stakeholders involved in the chain, such as our diverse
                talented work team, partners, clients, and the society.
                Moreover, in our pursuit to create brilliant business
                opportunities and ensure value-added solutions to our clients,
                we’ve explored new applications and best of the breed techniques
                within the areas of web design, software development and online
                marketing.
              </p>
              <p>
                Whether you are looking for aggressive marketing strategies to
                take off your online business or reliable task management
                application to streamline your management procedures or creative
                design/development works to intensify your business activities
                on the web, we assure that – irrespective of how much intricate
                or minor your requisites are - you’ll have a very rewarding
                experience with our wide-ranging, cost effective solutions. Our
                people are more than happy to answer any kind of queries you may
                have on our services. All you need to do is to let us know how
                we can be of your assistance.
              </p>
              <p>
                We look forward to work with you as your technology partner and
                craft innovative IT solutions that would not only improve the
                efficiency of your organizational procedures but also contribute
                towards the success of your business.
              </p>
            </div>

            <div className="mt-8">
              <div className="text-sm font-extrabold text-ink">Thanks,</div>
              <div className="mt-1 text-base font-extrabold text-ink">
                Vikram Singh
              </div>
              <div className="text-sm font-semibold text-muted">
                Managing Director
              </div>
            </div>
          </Card>
        </Container>
      </section>

      {/* <CompanyCTA /> */}
    </>
  );
}
