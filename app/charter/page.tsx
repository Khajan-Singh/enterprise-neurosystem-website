import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Charter",
  description:
    "How Enterprise Neurosystem is governed: project objectives, the Technical Committee, the Governing Board, community assets, and compliance.",
};

const sections = [
  {
    id: "objectives",
    title: "Project Objectives and Scope",
    body: [
      "AI and ML are areas of intense focus and experimentation across a wide range of industries, functional disciplines, and operational scale. Yet the concrete expression of the work tends to be extremely organization- and/or function-specific, as models are typically trained on relatively narrow and proprietary datasets.",
      "We see a need for a community effort to:",
    ],
    list: [
      "Open up and standardize development of models and adaptive frameworks, using and creating public datasets",
      "Tie together various models and data sources across the enterprise in a unified framework",
      "Abstract prediction and forecasting techniques that can be applied across a range of business domains",
      "Eventually apply AI/ML to wide-scale system analysis, using cross-correlation across different domains to intensify business intelligence and accelerate operational responsiveness",
    ],
    after: [
      "We expect to apply these general principles first to a well-defined set of open models and practice areas, including network analysis, predictive hardware/software maintenance, and others — testing concepts and models at global scale.",
      "We are also focused on expanding access to the value of AI across enterprises by improving simplicity and usability, progressively extending the reach of the Enterprise Neurosystem into upstream business domains.",
    ],
  },
  {
    id: "technical-committee",
    title: "Technical Committee",
    body: [
      "The Technical Committee (TC) is responsible for all aspects of oversight relating to coordinating the technical direction of the project, and for approving proposals per established processes. The TC coordinates community engagement, works with external open source communities, and establishes norms and security policies.",
      "A Technical Community Leader (TCL) drives development and facilitates contributions. The evaluation body was constituted with diversity considerations, given AI's potential for encoding bias. TCLs are nominated or can self-nominate from among existing Committers, and are elected by plurality vote from community members with accepted contributions in the prior twelve months.",
      "A Contributor may become a Committer by a majority approval of existing Committers, and at need may be removed by majority approval of the other existing Committers.",
      "Technical participation remains open to anyone following the charter's terms. Technical Committee meetings are conducted in English and are open to the public and documented for subsequent review.",
    ],
  },
  {
    id: "governing-board",
    title: "Governing Board",
    body: [
      "The Governing Board sets strategic direction per the Mission, and oversees budget, policies, legal matters, and marketing.",
      "Composition includes a Chair, a Vice Chair-Treasurer (combined role), and the Technical Community Leader/CTO. The Chair and Vice Chair-Treasurer cannot be from the same organization, and no more than two board members may be from the same organization, including subsidiaries. Each board seat has a four year term.",
      "The Board may choose to admit additional members, such as Sector or Vertical representatives or a User Community representative, on either a voting or non-voting basis. Total board composition shall not exceed thirteen members. The Board may also form operational workgroups for marketing, finance, and similar functions, composed of community volunteers reporting to the Board.",
    ],
    subsections: [
      {
        heading: "Chair responsibilities",
        list: [
          "Organize and lead regular Board meetings on an agreed cadence",
          "Authorize payments per Board-approved budgets or majority-approved expenses",
          "Lead member company recruitment with assistance from the Board and Technical Community",
          "Regularly attend Technical Committee meetings and align with the Technical Community Leader",
        ],
      },
      {
        heading: "Vice Chair-Treasurer responsibilities",
        list: [
          "Develop annual operating plans and budgets as needed",
          "Advise on and validate operating plan budgets",
          "Review monthly payments authorized by the Director",
          "Report regularly on revenues and expenditures relative to budget",
        ],
      },
    ],
    after: [
      "Industry sectors — Education/Research, Financial Services, IT Vendor, and others — are created over time, with sector representatives elected by sector participants.",
    ],
  },
  {
    id: "voting",
    title: "Voting Procedures",
    list: [
      "One vote per Governing Board Voter",
      "Additional voting members admitted by majority vote of existing Voters",
      "Voters missing three consecutive meetings without proxy designation have voting capacity suspended until attending two successive meetings",
      "Voters missing four or more consecutive meetings may be removed by the Board and replaced",
      "Elections and voting decisions require fifty percent quorum of voting members",
      "Voting occurs during Board meetings or by electronic means within specified timeframes",
      "Charter or policy amendments require a majority Board vote",
    ],
  },
  {
    id: "assets",
    title: "Community Assets and Intellectual Property",
    body: [
      "The Platform is licensed under the Apache v2.0 license. Subsidiary Projects may choose other permissive licenses, as specified in their technical charters. Documentation and marketing content are published under a Creative Commons CC BY license. The Project owns its repositories, social media accounts, and domain registrations.",
      "Title to all trade or service marks used by the Project (“Project Trademarks”) is currently held by Red Hat, Inc. Upon joining an open source foundation or fiscal conservancy, trademarks transfer to that entity.",
      "The Project may integrate with upstream open source projects while conforming to their license requirements; upstream contributions follow applicable project processes and licenses.",
    ],
  },
  {
    id: "compliance",
    title: "Compliance with Policies and Licenses",
    body: ["Contributors must comply with Governing Board-adopted policies including:"],
    list: [
      "Contributor requirements, including the Developer Certificate of Origin",
      "Code of Conduct and complaint process",
      "Terms of Use",
      "Trademark and Branding Policy",
    ],
  },
];

export default function CharterPage() {
  return (
    <>
      <section className="border-b border-line bg-bg-subtle">
        <Container className="py-20 sm:py-28">
          <Reveal>
            <SectionHeading
              eyebrow="About"
              title="Charter"
              description="How the Enterprise Neurosystem community is scoped, governed, and held accountable — from technical contribution to board oversight."
            />
          </Reveal>
        </Container>
      </section>

      <section>
        <Container className="grid gap-16 py-20 lg:grid-cols-[220px_1fr] lg:gap-20">
          <nav className="hidden lg:block">
            <ul className="sticky top-24 flex flex-col gap-3 border-l border-line pl-5 text-sm">
              {sections.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className="text-ink-muted transition-colors hover:text-ink"
                  >
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex max-w-3xl flex-col gap-16">
            {sections.map((section) => (
              <Reveal key={section.id}>
                <div id={section.id} className="scroll-mt-24">
                  <h2 className="font-display text-2xl font-semibold tracking-tight text-ink">
                    {section.title}
                  </h2>
                  <div className="mt-4 flex flex-col gap-4 text-base leading-relaxed text-ink-muted">
                    {section.body?.map((p, i) => <p key={i}>{p}</p>)}
                    {section.list && (
                      <ul className="flex flex-col gap-2 pl-1">
                        {section.list.map((item, i) => (
                          <li key={i} className="flex gap-3">
                            <span className="mt-2.5 h-1 w-1 flex-shrink-0 rounded-full bg-accent" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                    {section.subsections?.map((sub) => (
                      <div key={sub.heading} className="mt-2">
                        <h3 className="font-display text-base font-semibold text-ink">
                          {sub.heading}
                        </h3>
                        <ul className="mt-3 flex flex-col gap-2 pl-1">
                          {sub.list.map((item, i) => (
                            <li key={i} className="flex gap-3">
                              <span className="mt-2.5 h-1 w-1 flex-shrink-0 rounded-full bg-accent" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                    {section.after?.map((p, i) => <p key={`after-${i}`}>{p}</p>)}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
