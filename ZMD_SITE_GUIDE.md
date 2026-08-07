# ZMD website direction, copy guide and production checklist

Updated: 5 August 2026

## 1. Approved company story

ZMD manufactures complete hardware products for OEM portfolios. The primary public story is the product portfolio: Cameras, Edge Devices and Servers. ODM and white-label supply describe the commercial model, but they are supporting information rather than the repeated brand headline.

The current priority product families are:

1. Cameras
2. Edge Devices
3. Servers

Drones and delivery robots are future categories. Selected IoT devices, including safety bands and parking sensors, may be discussed as custom requirements. They must remain visually subordinate to the three current product families.

The solution story is secondary. ZMD hardware can contribute to industry solutions when combined with application software and systems integration. ZMD must not appear to claim sole ownership of a complete software, integration and deployment stack.

The Edge AI page is a focused Intel launch story. It is a microcosm of the wider ZMD positioning, centred on the physical Edge Device and the applications it can support.

## 2. Audience and conversion priority

Priority audiences:

- OEM and technology brands
- System integrators
- Enterprise and industrial buyers
- Distributors

Primary conversion:

- Partner with ZMD

Secondary conversions:

- View products
- View Cameras
- View Edge Devices
- View Servers
- Request product information
- Discuss a solution
- View launch details

The site does not need investor messaging, CRM integration, analytics integration or a public support portal for the first release.

## 3. Current page map

- Home
- Products
  - Cameras
  - Edge Devices
  - Servers
- Edge AI
- Solutions
  - Surveillance section
  - Industrial AI section
  - Healthcare section
- Company
- Contact

Thin Camera, Edge Device and solution-detail URLs redirect to the relevant family or Solutions section until approved SKUs, specifications and deployment evidence justify standalone pages. Privacy and Terms links remain hidden until approved legal copy is available.

The desktop and mobile-web versions use the same content hierarchy. Mobile reduces spacing, changes diagrams to vertical flows and places product hardware inside the first viewport.

## 4. Content hierarchy

Every major page should follow this order:

1. Product or category name
2. What ZMD manufactures or supplies
3. Available configuration or form factor
4. Target workload or deployment environment
5. Relevant specifications
6. Commercial enquiry

On the homepage the hierarchy is:

1. Complete hardware products for OEM portfolios
2. Cameras, Edge Devices and Servers manufactured by ZMD
3. ZMD's role in physical AI hardware
4. Intel Edge AI launch
5. Industry solution reference architectures
6. Contact

ODM or white-label supply is stated once near the hero as the commercial model. The rest of the site should use concrete manufacturing and product language. It should not become a separate homepage section until ZMD can publish specific customization, manufacturing, testing, quality and commercial-program evidence.

## 5. Visual direction

The design language is an industrial product dossier, not a futuristic AI campaign.

Use:

- Large hardware product imagery
- Cool white, light grey, graphite and near-black surfaces
- Existing ZMD red as the technical marker and primary CTA colour
- Thin rules, specification rails and chassis-derived spacing rhythms
- Square or near-square controls and badges
- Compact sections with clear information density
- Asymmetric product modules so Cameras, Edge Devices and Servers do not look like interchangeable cards
- Direct labels such as Local compute, Visual inputs and Infrastructure

Avoid:

- Floating brains, neural networks and generic AI imagery
- Neon gradients, glass effects, glowing grids and oversized red slogans
- Large empty hero areas
- Repeated numbered-card grids
- Decorative technical labels that do not communicate real information
- Imagined deployment scenes presented as customer evidence
- Unverified hardware diagrams or ports presented as technical truth

### Spacing targets

- Desktop content width: up to 1360 px
- Desktop section padding: approximately 72 px
- Compact sections: 48–56 px
- Mobile horizontal margin: 16 px
- Mobile section padding: approximately 50 px
- Desktop header: 68 px plus 34 px launch rail
- Mobile header: 60 px plus 34 px launch rail

The mobile homepage must show a physical product by approximately 600 px from the top. It must not require a full viewport of brand copy before showing hardware.

## 6. Typography

### Competitive benchmark

- Supermicro uses Source Sans Pro for body/navigation and PT Sans Narrow for major headlines.
- QCT uses Open Sans across its product catalogue.
- Quanta uses a restrained Arial/system-sans approach.
- Wiwynn uses Poppins for display copy and Roboto/Noto Sans for body copy.
- Advantech uses Heebo across its primary interface.
- AAEON uses Red Hat Display and Red Hat Text on newer pages.

The recurring pattern is practical sans-serif typography, compact hierarchy and limited stylistic decoration.

### ZMD type system

- Corporate hero and body typography: Source Sans 3, weight 400–700
- Compact product and category headings: Roboto Condensed, weight 500–700
- Technical identifiers and specification labels: IBM Plex Mono, weight 400–500

Target sizes:

- Desktop hero: 60–68 px
- Mobile hero: 40–44 px
- Desktop section heading: 44–52 px
- Mobile section heading: 32–36 px
- Product title: 24–32 px
- Lead copy: 18–19 px
- Body copy: 16–17 px
- Navigation: 14–15 px
- Technical label: 10–12 px

Monospace must be reserved for processor names, configuration labels, status, model identifiers and specifications. It is not a general brand font.

## 7. Image policy

### Reused in the current prototype

- `frontend/src/assets/images/cam/duallens_ourmodel.webp`
- `frontend/src/assets/images/cam/singlelens_ourmodel.webp`
- `frontend/src/assets/images/cam/headmountcam.webp`
- `frontend/src/assets/images/edge/edge_hardware_hero.png`
- `frontend/src/assets/images/edge/edge_box_small.png`
- `frontend/src/assets/images/edge/edge_box_pro.png`
- `frontend/src/assets/images/server/server_chassis.png`

These images work as product/category evidence in the prototype. Edge Device and Server renders still require a product-truth review before production publication.

### Excluded from the redesign

- The 145-frame homepage AI animation
- Fictional “Neural Engine X1” visuals
- Veo-watermarked frames
- Generic brain/network Edge AI artwork
- Glossy generic ecosystem plinth images
- Synthetic retail, smart-city, parking and manufacturing scenes
- Images whose filenames begin with `ChatGPT Image`
- `bulletcam.webp`, because the checkerboard background is baked into the file
- Unverified server blueprints, internal layouts and architecture diagrams

The final production site should replace any unverified product render with approved photography or CAD-derived imagery of the actual shipping product.

## 8. Competitive copy findings

The useful patterns from current competitor sites are:

- Supermicro maps every category to form factor, processor, expansion and workload.
- QCT leads with product family, configuration filters and procurement detail.
- Quanta uses restrained manufacturer language with minimal campaign copy.
- Wiwynn uses serious partnership language but supports it with manufacturing and scale evidence.
- Advantech separates products, partners, industries, resources and success cases.
- AAEON often makes the processor, model and one technical differentiator the headline.
- CP Plus moves rapidly from category language to exact model, feature list, specification table and downloads.
- Netweb supports strong claims with model counts, deployment proof and technical scale.
- Kaynes uses direct manufacturing verbs rather than abstract innovation language.

ZMD should sound closest to a combination of Quanta, QCT, CP Plus and Netweb: product-led, configuration-aware and evidence-disciplined.

## 9. ZMD voice rules

The voice is serious, direct, technically literate and commercially confident.

Prefer:

- Manufactures
- Supplies
- Provides
- Available with
- Powered by
- Designed for
- Supports
- Suitable for
- Can support
- Contact ZMD for availability

Avoid unless supported by evidence:

- World-class
- Industry-leading
- Best-in-class
- Proven
- Certified
- Trusted by leading OEMs
- Ready to deploy
- At scale
- Zero latency
- Guaranteed
- End-to-end
- Real-time, unless technically defined
- Revolutionizes
- Reimagines
- Limitless
- Transformative

Writing limits:

- Hero headline: 6–10 words where possible
- Section heading: 3–8 words
- Intro paragraph: 25–45 words
- Product-card description: 15–25 words
- Sentence case for headings and interface copy
- One technical or commercial benefit per sentence

### Product-description formula

`[Model] is a [product class] with [verified differentiator], designed for [deployment or application].`

Example:

`ZMD [model] is a dual-lens network camera with panoramic coverage, designed for entrance, perimeter and open-area monitoring.`

An individual model page must become more precise than its category page. Once available, each model should publish:

1. Exact model or SKU
2. Plain product-class description
3. Five to eight verified highlights
4. Multiple approved product views
5. Complete technical table
6. Interfaces and compatibility
7. Power and operating environment
8. Certifications
9. Availability
10. Request product information CTA

## 10. Partner policy

Named partners appear once, near the bottom of the Solutions page. The ApexFabric product name is excluded from the launch website until public documentation, supported applications and validated ZMD configurations are available.

Approved disclosure:

> For selected solution opportunities, ApexFlo Labs supports the application platform layer, while VConnectech Systems supports systems integration and deployment. ZMD remains the hardware product provider.

Do not repeat the named partners on Home, Products, Edge AI, individual solution pages, Company, Contact, header or footer. Elsewhere use the generic terms application software, application platform and systems integration.

Do not present ZMD, the solution partner and the integration partner as three equal product cards. ZMD remains the primary hardware manufacturer and brand story.

## 11. Production-pending content

The visual system and page architecture can proceed with the current information. The following items are required before production deployment:

### Products

- Final camera model names and SKU matrix
- Approved camera specification sheets
- Final Edge Device product name
- Approved 285H and 225H configuration matrix
- Edge Device I/O, memory, storage, power, dimensions and environmental data
- Final Server family/model names
- Server chassis, processor, memory, storage, expansion and compliance data
- Product availability by model and region
- Confirmation that every published render matches a shipping product

### ODM and manufacturing proof

- Approved white-label scope
- Available branding/customization options
- Manufacturing location and facilities
- Assembly and testing capabilities
- Quality-control process
- Certifications and compliance
- MOQ, lead-time or commercial-process information, if publishable

### Support and legal

- Warranty terms
- Support channels and service commitments
- Returns/RMA process, if applicable
- Privacy policy
- Terms of use
- Cookie and data-handling requirements

### Brand and partner assets

- Correct, web-ready ZMD logo export with transparent background
- Approved ApexFlo Labs and VConnectech Systems logos, if the text-only disclosure is replaced
- Written approval for partner-logo use
- Final Intel trademark wording
- Intel logo remains excluded until approved

### Proof and credibility

- Approved manufacturing/facility photography
- Approved product photography
- Approved case studies or reference deployments
- Approved customer/OEM names, only if publication permission is obtained
- Datasheets and downloadable collateral

## 12. Current implementation status

Implemented locally:

- Responsive desktop and mobile-web navigation
- Dense product-led homepage
- Asymmetric hardware portfolio presentation
- Manufacturer-led positioning with one concise ODM/white-label commercial note
- Generic physical AI hardware flow without repeated partner advertising
- Intel Edge AI launch page
- Camera, Edge Device and Server family pages
- Thin product/configuration routes redirected to the stronger family pages
- One Solutions page with three substantive reference-architecture sections
- Single named-partner disclosure on Solutions
- Company and Contact pages
- Public legal placeholders and links removed until approved copy is available
- Responsive typography and compact mobile spacing
- Direct email and phone CTAs
- Updated page metadata; the previous slogan-led social preview is no longer referenced

The local prototype intentionally excludes generic AI artwork and unverified solution scenes.
