import { pageMetadata } from "@/lib/seo";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { SectionSidebar } from "@/components/SectionSidebar";
import { AmbientShadow } from "@/components/AmbientShadow";
import { Reveal } from "@/components/Reveal";

export const metadata = pageMetadata({
  title: "Charter",
  description:
    "How Enterprise Neurosystem is governed: project objectives, the Technical Committee, the Governing Board, community assets, and compliance.",
  path: "/charter",
});

const sections = [
  {
    id: "objectives",
    title: "Project Objectives and Scope",
    body: [
      "AI and ML are areas of intense focus and experimentation across a wide range of industries, functional disciplines and operational scale. Yet the concrete expression of the work tends to be extremely organization and/or function-specific, as models are typically trained on relatively narrow and proprietary datasets.",
      "We see a need for a community effort to:",
    ],
    list: [
      "Open up and standardize development of models and adaptive frameworks, using and creating public datasets",
      "Tie together various models and data sources across the enterprise in a unified framework",
      "Abstract prediction and forecasting techniques that can be applied across a range of business domains",
      "Eventually apply AI/ML to wide-scale system analysis, using cross-correlation across different domains to intensify business intelligence and accelerate operational responsiveness",
    ],
    after: [
      "We expect to apply these general principles first to a well-defined set of open models and practice areas, including network analysis, predictive HW/SW maintenance, and others. This will allow us to test concepts and models at global scale.",
      "We are also focused on expanding access to the value of AI across enterprises by improving simplicity and usability of the technologies. The customer experience impact of improvements in these areas will provide opportunities to progressively expand the reach of the Enterprise Neurosystem into upstream business domains.",
    ],
  },
  {
    id: "technical-committee",
    title: "Technical Committee",
    body: [
      "The Technical Committee (TC) will be responsible for all aspects of oversight relating to coordinating the technical direction of the Project, including the architecture and sub-projects needed to achieve the Mission and Scope of the Project; for approving project or system proposals (including, but not limited to, incubation, deprecation, and changes to a sub-project's scope) in accordance with the Contribution Process and Inbound Code Review Policy to be developed, approved and maintained by the TC; coordinating TC engagement with the end-user community with respect to requirements, high level architecture, implementation experiences, use cases, etc; working with other open source or open standards communities as needed; and establishing and enforcing community norms, workflows, issuing releases, and security issue reporting policies.",
      "The Technical Committee will require a Technical Community Leader (TCL) to drive the development of the Project, including facilitation of community contributions to Project milestones and resolution of any Community disagreements of a technical nature, eg relating to the architecture or achievement of technical milestones. The Leader will also represent the overall Technical Committee within the Governing Board. In brief, the technical Community Leader should be an excellent project manager and diplomat in addition to possessing technical vision and skills.",
      "For the first six months after adoption of Version 1 of this charter, adopted in August 2021, an evaluation body of 5-7 Committers, including the TCL, was constituted by self-nomination or nomination by other community members. Recognizing the unprecedented reach of AI and potential for harm through encoding of unconscious bias or lack of awareness of dangers faced by certain groups, the evaluation body was constituted with consideration for diversity across the broadest range of parameters possible.",
      "Hereafter, with the adoption of Version 2 of this charter on Jan 7, 2022, Technical Community Leaders (TCLs) will be nominated or can self-nominate from among the existing Committers. The TCL will be elected by the greatest plurality for a term of 1 year by a private electronic vote of community members who have documented contributions accepted within the previous 12 months (\"Voters\").",
      "A Contributor may become a Committer by a majority approval of existing Committers, and at need may be removed by majority approval of the other existing Committers. Project Contributors may request the removal of a Committer by notifying the Governing Board, or the Committer can resign for their own reasons. The Technical Committee may add, refine and/or eliminate Technical Committee roles, as it sees fit. Expected additional roles include a Lead Architect for the overall community as well as Project Leads for individual sub-projects.",
      "Technical participation in the Project is open to anyone so long as they abide by the terms of this document and documents referenced herein. Technical Committee meetings are conducted in English and are open to the public and documented for subsequent review. The TC generally will involve Contributors and Committers. Contributors include anyone in the Technical Community who contributes code, documentation, models or other artifacts to the Project. Committers are Contributors who have earned the ability to approve or modify (\"commit\") source code, documentation or other artifacts in a project's repository. Each sub-project will ideally have at least 2 Committers, with a strong desire for Committer diversity.",
    ],
  },
  {
    id: "governing-board",
    title: "Governing Board",
    body: [
      "The Governing Board is responsible for setting the strategic direction of the Project in accordance with its Mission. It provides approval and oversight of any budget and disbursements, policy documents and other legal matters, marketing, and other non-technical activities of the Project. Board business will be conducted in English and will be documented for later review.",
      "As a community-led open source project, the majority of work performed to develop and advance the Enterprise Neurosystem and its adoption is expected to be done by community members. This work may take the form of technical contributions as described in the Technical Committee section, as well as non-technical forms of contribution, including gathering feedback from Users, marketing, design, legal review and other activities. Where necessary expertise is not available in the community, the Project or its members may contract with commercial entities, including consultants, for incremental support.",
      "The Governing Board will be composed minimally of a Chair, Vice Chair-Treasurer (a single person), and the Technical Community Leader/CTO. The Chair and Vice Chair-Treasurer may not be employed by the same organization, and no more than 2 Board members may be from the same organization, including its subsidiaries. The Board may choose to admit additional members, such as Sector or Vertical representatives or a User Community representative, on either a voting or non-voting basis, under the Voting procedures described below. Each board seat will have a four year term. At the end of that term, the seat will be vacated, and a replacement board member will be nominated and selected by community members via majority vote. To ensure operational efficiency, the Board shall be composed of no more than 13 members in total.",
      "The Board may choose to form under its aegis operational workgroups to execute non-technical functions such as marketing, finance, etc, which may be composed of volunteers from the entire project community; such workgroups will report their proposals and activities to the Board.",
      "The Community Voters will elect the Chair by private vote (greatest plurality) according to the Voting procedures listed below. The Chair need not have made technical contributions, but is expected to have demonstrated consistent support for the Project in either a technical or non-technical capacity. The Chair will have the following responsibilities:",
    ],
    subsections: [
      {
        heading: "Chair responsibilities",
        list: [
          "Organize and lead regular Board meetings, on a cadence to be agreed by the Board.",
          "Authorize payments to third-party vendors in accordance with the Board-approved budget or for expenses approved by majority vote by the Board.",
          "Lead Member company recruitment, with the assistance of other Governing Board and Technical Community members.",
          "Regularly attend Technical Committee meetings and work closely with the Technical Community Leader to ensure ongoing alignment between the Governing Board and Technical Community.",
        ],
      },
      {
        heading: "Vice Chair-Treasurer responsibilities",
        intro:
          "The Vice Chair-Treasurer will be elected according to the same criteria and process as the Chair. The Treasurer will have the following responsibilities.",
        list: [
          "Work with the Board and its workgroups to develop an annual operating plan and budget as needed and report regularly on execution to plan.",
          "Advise on and validate operating plan's budget.",
          "Review payments authorized by the Director each month, and report regularly on revenues and expenditures in relation to budget.",
        ],
      },
    ],
    after: [
      "The Technical Community Leader's role and selection process are described in the Technical Community section above.",
      "From time to time, the Board shall create industry Sectors (eg Education/Research, Financial Services, IT Vendor, etc). Voting for a given Sector representative to the Board will be limited to community members from that Sector. Individual members of the Enterprise Neurosystem community may elect to participate in any sectors of personal interest and expertise.",
      "The Sector representative to the Board shall be elected by those participating in that sector. In the case of getting more than 2 representatives from the same organization elected to the board by the various sectors, the 2 individuals receiving the greatest number of votes shall be seated on the Board, and the runners-up will be seated from the remaining sectors.",
      "The Committee may choose to define and formalize additional roles to assist the Chair or lead particular initiatives under the Voting procedures described below.",
    ],
  },
  {
    id: "voting",
    title: "Voting Procedures",
    list: [
      "1 vote per Governing Board Voter",
      "Other voting members may be admitted by majority vote of existing Voters.",
      "If a Governing Board Voter misses 3 meetings in a row without designating a proxy, their voting capacity will be suspended until they have attended 2 meetings in succession.",
      "If a Governing Board Voter misses 4 or more meetings in a row, with or without a proxy, the Governing Board may remove that individual and replace them with someone with greater availability for the remainder of their term.",
      "Elections and any other voting decisions require a quorum of 50% of voting members. Voting can be held during Board meetings, or by electronic means within a specified time period.",
      "Amendments to this or Policy documents require a majority vote of the Governing Board.",
    ],
  },
  {
    id: "assets",
    title: "Community Assets and Intellectual Property",
    body: [
      "The Platform is licensed under the Apache v2.0 license. Subsidiary Projects may choose other permissive licenses, to be specified in their respective technical charters. Project documentation, web and marketing content shall be published under Creative Commons CC BY license. The Project shall develop and own all Project repositories and social media accounts, and domain name registrations created by the Project.",
      "The Project may seek to integrate and contribute back to other open source projects (\"Upstream Projects\"). In such cases, the Project will conform to all license requirements of the Upstream Projects, including dependencies, leveraged by the Project. Upstream Project code contributions not stored within the Project's main code repositories shall comply with the contribution process and license terms for the applicable Upstream Project.",
    ],
  },
  {
    id: "compliance",
    title: "Compliance with Policies and Licenses",
    body: ["Contributors will comply with the policies adopted by the Governing Board of Enterprise Neurosystem. These policies may include:"],
    list: [
      "Contributor requirements, including use of the Developer Certificate of Origin",
      "Code of Conduct and complaint process",
      "Terms of Use",
      "Trademark and Branding Policy",
    ],
  },
];

export default function CharterPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-line bg-page-header">
        <AmbientShadow opacity={0.07} />
        <Container className="relative pt-4 pb-10">
          <SectionHeading
            as="h1"
            title="Charter"
            description="How the Enterprise Neurosystem community is scoped, governed, and held accountable — from technical contribution to board oversight."
          />
        </Container>
      </section>

      <section>
        <Container className="grid gap-16 py-20 lg:grid-cols-[220px_1fr] lg:gap-20">
          <SectionSidebar
            sections={sections.map((s) => ({ id: s.id, title: s.title }))}
          />

          <div className="flex max-w-3xl flex-col gap-16">
            {sections.map((section) => (
              <Reveal key={section.id}>
                <div id={section.id} className="scroll-mt-28">
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
                        {sub.intro && <p className="mt-3">{sub.intro}</p>}
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
