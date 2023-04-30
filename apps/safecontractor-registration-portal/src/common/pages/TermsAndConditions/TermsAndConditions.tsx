import React from 'react';
import { Grid, makeStyles, Typography } from '@material-ui/core';
import { Page, StyleVariables } from '@alcumus/components';
import clsx from 'clsx';
import AboutSection from '../../components/AboutSection';
import {
  liveChatContainer,
  mobileLiveChatContainerBox,
  termsServicePackageData,
} from '../../constants';
import { FooterBackgroundColor } from '../../components/constants';

const useStyles = makeStyles((theme) => ({
  cssPage: {
    padding: 0,
    margin: 0,
  },
  footer: {
    padding: '2.5rem',
    backgroundColor: FooterBackgroundColor,
    position: 'fixed',
    bottom: '0',
    left: '0',
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  scrollablediv: {
    height: 'calc(100vh)',
    overflow: 'auto',
    scrollbarWidth: 'thin',
    paddingBottom: '32px',
    [theme.breakpoints.down('xs')]: {
      height: 'calc(100vh - 80px)',
    },
  },
  stepper: {
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  title: {
    fontWeight: StyleVariables.fonts.weight.semiBold,
    fontSize: StyleVariables.fonts.size.h4,
    lineHeight: StyleVariables.fonts.lineHeight.h4,
    marginTop: '24px',
    marginLeft: '5rem',
    marginRight: '5rem',
    [theme.breakpoints.down('sm')]: {
      marginLeft: '16px',
      marginRight: '16px',
    },
  },
  tableContainer: {
    marginTop: '1rem',
    marginLeft: '5rem',
    marginRight: '5rem',
  },
  borderCell: {
    marginTop: '1rem',
    padding: '0.5rem',
    border: '1px solid black',
    borderCollapse: 'collapse',
  },
  subtitle: {
    color: StyleVariables.colors.text.subdued,
    fontFamily: StyleVariables.fonts.family.heading,
    fontWeight: StyleVariables.fonts.weight.regular,
    fontSize: StyleVariables.fonts.size.small,
    lineHeight: StyleVariables.fonts.lineHeight.small,
    marginLeft: '5rem',
    marginTop: '8px',
    marginBottom: '8px',
    [theme.breakpoints.down('sm')]: {
      marginLeft: '16px',
      marginRight: '16px',
    },
  },
  infoContainer: {
    display: 'flex',
    marginLeft: '5rem',
    [theme.breakpoints.down('sm')]: {
      marginLeft: '16px',
      marginRight: '16px',
    },
  },
  subText: {
    marginLeft: '1rem',
  },
  innerText: {
    marginLeft: '1rem',
    marginTop: '1rem',
  },
  subtitleText: {
    fontFamily: StyleVariables.fonts.family.heading,
    fontWeight: StyleVariables.fonts.weight.regular,
    fontSize: StyleVariables.fonts.size.h6,
    lineHeight: StyleVariables.fonts.lineHeight.regular,
  },
  infotitle: {
    marginTop: '1rem',
    fontWeight: StyleVariables.fonts.weight.semiBold,
    fontSize: StyleVariables.fonts.size.h4,
    lineHeight: StyleVariables.fonts.lineHeight.regular,
  },
  subcontentContainer: { display: 'flex' },
  contentContainer: {
    display: 'flex',
    marginLeft: '5rem',
    marginTop: '1rem',
    [theme.breakpoints.down('sm')]: {
      marginLeft: '16px',
      marginRight: '16px',
    },
  },
}));

export default function TermsAndConditions() {
  const classes = useStyles();
  return (
    <Page className={classes.cssPage}>
      <style type="text/css">{liveChatContainer}</style>
      <style type="text/css">{mobileLiveChatContainerBox}</style>
      <Grid item xs={12} className={classes.scrollablediv}>
        <AboutSection />
        <Typography className={classes.title} variant="h1" component="h1">
          Alcumus SafeContractor Limited (Trading as &apos;SafeContractor&apos;)
          Registered No. 07618138 (Referred to as “Alcumus”) Terms and
          Conditions of Contract
        </Typography>
        <Typography className={classes.subtitle} variant="h2" component="h2">
          January 2023
        </Typography>
        <Grid container>
          <Grid item xs={10} className={clsx(classes.infoContainer)}>
            <Typography className={classes.infotitle}>1.</Typography>
            <Typography className={clsx(classes.subText, classes.infotitle)}>
              DEFINITION AND INTERPRETATION
            </Typography>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={10} className={clsx(classes.contentContainer)}>
            <Typography className={classes.subtitleText}>1.1</Typography>
            <Grid>
              <Typography
                className={clsx(classes.subText, classes.subtitleText)}
              >
                In the Contract:{' '}
              </Typography>
              <Typography className={classes.innerText}>
                <b>&quot;Accreditation&quot;</b> means the status provided to
                the Contractor where it has been assessed by Alcumus and has
                satisfactorily met the required Accreditation Standards.
              </Typography>
              <Typography className={classes.innerText}>
                <b>&quot;Accreditation Date&quot;</b> has the meaning given to
                it in clause 5.11. &quot;Accreditation Logo&quot; means the seal
                of approval logo owned by Alcumus which is provided to
                Accredited Members to prove their Accreditation including the
                SafeContractor Scheme sticker, membership card and accreditation
                certificate.
              </Typography>
              <Typography className={classes.innerText}>
                <b>&quot;Accreditation Standards&quot;</b> means the assessment
                criteria that must be achieved by the Contractor in order to
                receive Accreditation (which for the avoidance of doubt are
                based on UK standards).
              </Typography>
              <Typography className={classes.innerText}>
                <b>&quot;Accredited Member&quot;</b> means a Contractor that is
                a current Member that has achieved and maintained Accreditation.
              </Typography>
              <Typography className={classes.innerText}>
                <b>&quot;Additional Term&quot;</b> means the additional 12
                monthly periods for which the Contract may be automatically
                extended in accordance with clause 7.1 and clause 15.1.
              </Typography>
              <Typography className={classes.innerText}>
                <b>&quot;Application&quot;</b> means an application for
                assessment submitted by the Contractor in order to be awarded
                the Accreditation.
              </Typography>
              <Typography className={classes.innerText}>
                <b>&quot;Approved List&quot;</b> means a Client&apos;s approved
                list of Members from time to time which for the avoidance of
                doubt will include details of a Contractor&apos;s Accreditation.
              </Typography>
              <Typography className={classes.innerText}>
                <b>&quot;Authorised User&quot;</b> means an individual whom the
                Contractor has authorised to have access to the Systems and to
                whom a password has been issued for such purpose.
              </Typography>
              <Typography className={classes.innerText}>
                <b>&quot;Charges&quot;</b> means the charges for the Services as
                set by Alcumus from time to time, including without limitation
                fees, expenses and other costs.
              </Typography>
              <Typography className={classes.innerText}>
                <b>&quot;Client&quot;</b> means a client who has signed up to
                receive the benefit of the SafeContractor Scheme. &quot;Client
                Portal&quot; means the portal that Clients are given access to
                in order to review the Approved List and/or the Master List.
                &quot;Contractor&quot; means the party who purchases or agrees
                to purchase the Services, subject always to clause 1.7.
              </Typography>
              <Typography className={classes.innerText}>
                <b>&quot;Client Portal&quot;</b> means the portal that Clients
                are given access to in order to review the Approved List and/or
                the Master List.
              </Typography>
              <Typography className={classes.innerText}>
                <b>&quot;Contractor&quot;</b> means the party who purchases or
                agrees to purchase the Services, subject always to clause 1.7.
              </Typography>
              <Typography className={classes.innerText}>
                <b>&quot;Contractor Portal&quot;</b> means the portal that the
                Contractor is given access to in order to be able to access the
                Systems to receive the Services.
              </Typography>
              <Typography className={classes.innerText}>
                <b>&quot;Conditions&quot;</b> means these terms and conditions
                of contract as amended in accordance with clause 2.2 and/or
                clause 16.3.
              </Typography>
              <Typography className={classes.innerText}>
                <b>&quot;Confidential Information&quot;</b> means in the case of
                either party all information (in any media) of a confidential
                nature disclosed by that party its employees, agents,
                consultants or subcontractors to the other including but not
                limited to all technical or commercial know-how, specifications,
                inventions, processes or initiatives.
              </Typography>
              <Typography className={classes.innerText}>
                <b>&quot;Contract&quot;</b> means the contract between Alcumus
                and the Contractor for the provision of the Services comprising
                these Conditions.
              </Typography>
              <Typography className={classes.innerText}>
                <b>&quot;Documents&quot;</b> means any and all certificates, any
                Application form, drawings, specifications, technical know-how,
                plans, reports, models, presentation materials, brochures,
                guides, course notes, training materials promotional materials
                etc. prepared by or on behalf of Alcumus.
              </Typography>
              <Typography className={classes.innerText}>
                <b>&quot;Employees&quot;</b> means for the purposes of the
                Contract, the total number of workers, legal employees,
                labour-only subcontracts, directors, partners and sole traders
                that the Contractor uses.
              </Typography>
              <Typography className={classes.innerText}>
                <b>&quot;Group&quot;</b> means in relation to a company, that
                company, any subsidiary or holding company from time to time of
                that company, and any subsidiary from time to time of a holding
                company of that company.
              </Typography>
              <Typography className={classes.innerText}>
                <b>&quot;Initial Term&quot;</b> means the minimum term of one
                year commencing on the Membership Registration Date.
              </Typography>
              <Typography className={classes.innerText}>
                <b>&quot;IP&quot;</b> means any patents, patent applications,
                trademarks or trading names (in each case, whether or not
                registered), trade mark applications, know-how, design rights
                registered or unregistered (including registered design
                applications), confidential information, copyright, database
                rights and all other intellectual property rights including any
                rights analogous to the same subsisting anywhere in the world at
                any time.
              </Typography>
              <Typography className={classes.innerText}>
                <b>&quot;Master List&quot;</b> means Alcumus&apos; master list
                of Accredited Members, as set out on the Client Portal.
              </Typography>
              <Typography className={classes.innerText}>
                <b>&quot;Member&quot;</b> means a Contractor who has achieved
                and who maintains Membership Status.
              </Typography>
              <Typography className={classes.innerText}>
                <b>&quot;Membership Registration Date&quot;</b> has the meaning
                given to it in clause 1.4.
              </Typography>
              <Typography className={classes.innerText}>
                <b>&quot;Membership Renewal Date&quot;</b> has the meaning given
                to it in clause 7.1.
              </Typography>
              <Typography className={classes.innerText}>
                <b>&quot;Membership Status&quot;</b> means the status provided
                to the Contractor once it has paid the Charges for the relevant
                year of the Term.
              </Typography>
              <Typography className={classes.innerText}>
                <b>&quot;Premises&quot;</b> means the Contractor&apos;s premises
                at which the Services may be provided (if any).
              </Typography>
              <Typography className={classes.innerText}>
                <b>&quot;SafeContractor Scheme&quot;</b> means the
                SafeContractor compliance scheme for contractors.
              </Typography>
              <Typography className={classes.innerText}>
                <b>&quot;Services&quot;</b>
                means the provision of Membership Status, the assessments for
                Accreditation and potential inclusion on the Master List and/or
                the Approved List(s) and in the SafeContractor Scheme, including
                the provision of the Systems.
              </Typography>
              <Typography className={classes.innerText}>
                <b>&quot;Services Package&quot;</b> means the package of
                Services (by reference to service level) as set out in Appendix
                1.
              </Typography>
              <Typography className={classes.innerText}>
                <b>&quot;Systems&quot;</b> means such on-line systems or portals
                as may be provided by Alcumus as part of the Services in
                accordance with the Contract including the Contractor Portal
                and/or such other systems notified to the Contractor by Alcumus
                from time to time.
              </Typography>
              <Typography className={classes.innerText}>
                <b>&quot;Term&quot;</b> means the Initial Term plus any
                Additional Terms.
              </Typography>
              <Typography className={classes.innerText}>
                <b>&quot;Unauthorised User&quot;</b> means any (a) Employee(s),
                agent(s) or independent contractor(s) of the Contractor; and/or
                (b) any other party under the Contractor&apos;s control, who is
                not an Authorised User.
              </Typography>
              <Typography className={classes.innerText}>
                <b>&quot;Working Day&quot;</b> means Monday to Friday
                (inclusive) excluding bank holidays and other days when clearing
                banks are not open for business in England and Wales.
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={10} className={clsx(classes.contentContainer)}>
            <Typography className={classes.subtitleText}>1.2</Typography>
            <Grid>
              <Typography
                className={clsx(classes.subText, classes.subtitleText)}
              >
                Wherever in the Contract provision is made for a communication
                to be &quot;written&quot; or &quot;in writing&quot; this
                includes email, but not fax.
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={10} className={clsx(classes.contentContainer)}>
            <Typography className={classes.subtitleText}>1.3</Typography>
            <Grid>
              <Typography
                className={clsx(classes.subText, classes.subtitleText)}
              >
                References to any statutes or statutory regulations shall be
                deemed to include any subsequent revisions or re-enactments
                thereof.
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={10} className={clsx(classes.contentContainer)}>
            <Typography className={classes.subtitleText}>1.4</Typography>
            <Grid>
              <Typography
                className={clsx(classes.subText, classes.subtitleText)}
              >
                In order to purchase the Services, the Contractor shall submit
                to Alcumus the membership registration form (either in person
                (when submitting online) or by authorising an Alcumus
                representative to submit on their behalf (when submitting by
                telephone)). At the point of submission of the membership
                registration form, a legally binding Contract shall come into
                existence (&quot;Membership Registration Date&quot;).
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={10} className={clsx(classes.contentContainer)}>
            <Typography className={classes.subtitleText}>1.5</Typography>
            <Grid>
              <Typography
                className={clsx(classes.subText, classes.subtitleText)}
              >
                These Conditions shall apply to and be incorporated in the
                Contract and shall be in substitution for any ongoing
                arrangement made between Alcumus and the Contractor and shall
                prevail over any terms or conditions contained in or referred to
                in any purchase order or other Contractor correspondence or
                elsewhere or implied by trade custom or practice or course of
                dealing. No addition to or variation of or exclusion or
                attempted exclusion of these Conditions shall be binding upon
                Alcumus unless specifically agreed to in writing and signed by a
                duly authorised representative of Alcumus.
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={10} className={clsx(classes.contentContainer)}>
            <Typography className={classes.subtitleText}>1.6</Typography>
            <Grid>
              <Typography
                className={clsx(classes.subText, classes.subtitleText)}
              >
                All the provisions of the Contract between Alcumus and the
                Contractor are contained in or referred to in these Conditions.
                In no circumstances shall any conditions of purchase submitted
                at any time by the Contractor be applied to the Contract, and
                any failure by Alcumus to challenge any such terms and
                conditions does not imply acceptance of those terms and
                conditions.
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={10} className={clsx(classes.contentContainer)}>
            <Typography className={classes.subtitleText}>1.7</Typography>
            <Grid>
              <Typography
                className={clsx(classes.subText, classes.subtitleText)}
              >
                For the avoidance of doubt, where a Contractor enters into these
                Conditions, the Contract must be between Alcumus and such
                Contractor. A third party (including any consultant) cannot
                accept these Conditions on behalf of the Contractor.
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={10} className={clsx(classes.infoContainer)}>
            <Typography className={classes.infotitle}>2.</Typography>
            <Typography className={clsx(classes.subText, classes.infotitle)}>
              SERVICES
            </Typography>
          </Grid>
          <Grid item xs={10} className={clsx(classes.contentContainer)}>
            <Typography className={classes.subtitleText}>2.1</Typography>
            <Grid>
              <Typography
                className={clsx(classes.subText, classes.subtitleText)}
              >
                During the Term, Alcumus shall supply the Services to the
                Contractor using all reasonable skill, care and diligence to the
                standards of a reasonably qualified and competent provider of
                services similar to the Services.
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={10} className={clsx(classes.contentContainer)}>
            <Typography className={classes.subtitleText}>2.2</Typography>
            <Grid>
              <Typography
                className={clsx(classes.subText, classes.subtitleText)}
              >
                Alcum us shall have the right to make any changes to the
                Services which are necessary to comply with any applicable law
                or safety requirement, or which do not materially affect the
                nature or quality of the Services, and Alcumus shall notify the
                Contractor of the relevant changes and any consequent amendment
                to the Charges in any such event.
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={10} className={clsx(classes.infoContainer)}>
            <Typography className={classes.infotitle}>3.</Typography>
            <Typography className={clsx(classes.subText, classes.infotitle)}>
              CHARGES AND PAYMENT
            </Typography>
          </Grid>
          <Grid item xs={10} className={clsx(classes.contentContainer)}>
            <Typography className={classes.subtitleText}>3.1</Typography>
            <Grid>
              <Typography
                className={clsx(classes.subText, classes.subtitleText)}
              >
                In the first contract year, the Contractor shall pay the Charges
                so that Alcumus has received such Charges in full and cleared
                funds on:
                <Grid
                  item
                  xs={10}
                  className={clsx(classes.subcontentContainer)}
                >
                  <Typography className={classes.subtitleText}>
                    3.1.1
                  </Typography>

                  <Typography
                    className={clsx(classes.subText, classes.subtitleText)}
                  >
                    the Membership Registration Date, where the Contractor is
                    paying by credit or debit card; or
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={10}
                  className={clsx(classes.subcontentContainer)}
                >
                  <Typography className={classes.subtitleText}>
                    3.1.2
                  </Typography>

                  <Typography
                    className={clsx(classes.subText, classes.subtitleText)}
                  >
                    the day that is no later than seven days after the
                    Membership Registration Date, where the Contractor is paying
                    by BACS
                  </Typography>
                </Grid>
                and in subsequent contract years, the Contractor shall pay the
                Charges so that Alcumus has received such Charges in full and
                cleared funds on or before the Membership Renewal Date. This may
                involve Alcumus taking such payments automatically from the
                credit or debit card that the Contractor used to make the
                payment in the first contract year, and the Contractor hereby
                authorises Alcumus to take such payments. All Charges are net of
                Value Added Tax (VAT) which the Contractor shall pay to Alcumus
                (at the prevailing rate) upon receipt of a valid VAT invoice.
                Time for payment shall be of the essence. The Contractor is
                responsible for providing complete and accurate billing and
                contact information to Alcumus and notifying Alcumus of any
                changes to such information.
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={10} className={clsx(classes.contentContainer)}>
            <Typography className={classes.subtitleText}>3.2</Typography>
            <Grid>
              <Typography
                className={clsx(classes.subText, classes.subtitleText)}
              >
                Alcumus reserves the right to carry out an annual review of the
                Charges at any time provided that such review of the Charges
                shall not take effect until the next Membership Renewal Date
                (when the next payment by the Contractor falls due). Alcumus
                shall notify the Contractor of any changes to the Charges at
                least 30 days prior to the Membership Renewal Date.
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={10} className={clsx(classes.contentContainer)}>
            <Typography className={classes.subtitleText}>3.3</Typography>
            <Grid>
              <Typography
                className={clsx(classes.subText, classes.subtitleText)}
              >
                Notwithstanding any other terms of the Contract, Alcumus may
                withhold or suspend the provision of the Services (including for
                the avoidance of doubt the Contractor&apos;s Accreditation), in
                addition to any other remedy available to Alcumus, without
                terminating the Contract if the Contractor has failed to pay the
                Charges in accordance with the Contract. In such circumstances,
                Alcumus shall amend the Contractor&apos;s status on the Client
                Portal to &apos;at risk&apos; until the payment is made.
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={10} className={clsx(classes.contentContainer)}>
            <Typography className={classes.subtitleText}>3.4</Typography>
            <Grid>
              <Typography
                className={clsx(classes.subText, classes.subtitleText)}
              >
                If the Contractor fails to make any payment due to Alcumus under
                the Contract by the due date for payment, then, without limiting
                Alcumus&apos; remedies under clause 3.1 or 3.3, the Contractor
                shall pay interest on the overdue amount at the rate of 4% per
                annum above Bank of England&apos;s base rate from time to time.
                Such interest shall accrue on a daily basis from the due date
                until actual payment of the overdue amount, whether before or
                after judgment. The Contractor shall pay the interest together
                with the overdue amount.
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={10} className={clsx(classes.contentContainer)}>
            <Typography className={classes.subtitleText}>3.5</Typography>
            <Grid>
              <Typography
                className={clsx(classes.subText, classes.subtitleText)}
              >
                If the Contractor requires Alcumus to carry out any additional
                services or increase the Services Package that the Contractor is
                receiving at any time throughout the Term, Alcumus shall be
                entitled to make additional charges for such services or
                additional items. This shall include but shall not be limited to
                provision of additional copies of certificates, additional
                stickers, changes to the listed work activities covered by the
                Accreditation (where a reassessment is necessary), upgrade fees
                and/or additional membership cards.
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={10} className={clsx(classes.contentContainer)}>
            <Typography className={classes.subtitleText}>3.6</Typography>
            <Grid>
              <Typography
                className={clsx(classes.subText, classes.subtitleText)}
              >
                All payments to be made by the Contractor under the Contract
                will be made in full without any set-off, restriction or
                condition and without any deduction for or on account of any
                counterclaim
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={10} className={clsx(classes.contentContainer)}>
            <Typography className={classes.subtitleText}>3.7</Typography>
            <Grid>
              <Typography
                className={clsx(classes.subText, classes.subtitleText)}
              >
                All Charges paid in accordance with the Contract are
                non-refundable. For the avoidance of doubt, this includes where
                the Contract is terminated in accordance with clause 15, or if
                Accreditation is suspended or withdrawn for any reason in
                accordance with clause 8.1, and regardless of whether the
                Contractor is successful in obtaining Accreditation.
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={10} className={clsx(classes.contentContainer)}>
            <Typography className={classes.subtitleText}>3.8</Typography>
            <Grid>
              <Typography
                className={clsx(classes.subText, classes.subtitleText)}
              >
                For the avoidance of doubt, Alcumus reserves the right to amend
                the Charges during the Term (and at any point in the membership
                year) in the event that there is a change to the number of
                Employees which would result in the Contractor being in a
                different Charges band. Where such amendment results in an
                increase to the Charges, the Contractor shall pay this within 30
                days of the date of an invoice covering such increase. Where the
                Contractor fails to pay such invoice on time, Alcumus shall be
                entitled to invoke its rights under clause 3.3 and/or clause
                3.4.
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={10} className={clsx(classes.infoContainer)}>
            <Typography className={classes.infotitle}>4.</Typography>
            <Typography className={clsx(classes.subText, classes.infotitle)}>
              THE CONTRACTOR&apos;S OBLIGATIONS
            </Typography>
          </Grid>
          <Grid item xs={10} className={clsx(classes.contentContainer)}>
            <Typography className={classes.subtitleText}>4.1</Typography>
            <Grid>
              <Typography
                className={clsx(classes.subText, classes.subtitleText)}
              >
                The Contractor shall:
                <Grid
                  item
                  xs={10}
                  className={clsx(classes.subcontentContainer)}
                >
                  <Typography className={classes.subtitleText}>
                    4.1.1
                  </Typography>

                  <Typography
                    className={clsx(classes.subText, classes.subtitleText)}
                  >
                    ensure prompt provision of resources, including decisions,
                    information, documentation and access (to personnel, records
                    and Premises) required to enable Alcumus and its agents and
                    employees to provide the Services in accordance with the
                    Contract;
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={10}
                  className={clsx(classes.subcontentContainer)}
                >
                  <Typography className={classes.subtitleText}>
                    4.1.2
                  </Typography>

                  <Typography
                    className={clsx(classes.subText, classes.subtitleText)}
                  >
                    ensure a safe working environment at the Premises for
                    Alcumus, its agents and employees; and ensure in the
                    interests of health and safety that Alcumus&apos; personnel,
                    while on the Premises for the purpose of carrying out the
                    Services have access at all times to an employee of the
                    Contractor familiar with the Premises and safety procedures;
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={10}
                  className={clsx(classes.subcontentContainer)}
                >
                  <Typography className={classes.subtitleText}>
                    4.1.3
                  </Typography>

                  <Typography
                    className={clsx(classes.subText, classes.subtitleText)}
                  >
                    be responsible for the accuracy and legality of all
                    information from time to time provided to Alcumus (whether
                    as part of the Application or otherwise), ensure that none
                    of it infringes the IP of or defames any third party and
                    indemnify and keep Alcumus indemnified accordingly in
                    respect of any third party intellectual property or
                    defamation claims;
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={10}
                  className={clsx(classes.subcontentContainer)}
                >
                  <Typography className={classes.subtitleText}>
                    4.1.4
                  </Typography>

                  <Typography
                    className={clsx(classes.subText, classes.subtitleText)}
                  >
                    be solely responsible for maintaining back-up and disaster
                    recovery procedures in respect of the information the
                    Contractor supplies to Alcumus from time to time;
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={10}
                  className={clsx(classes.subcontentContainer)}
                >
                  <Typography className={classes.subtitleText}>
                    4.1.5
                  </Typography>

                  <Typography
                    className={clsx(classes.subText, classes.subtitleText)}
                  >
                    perform its obligations in the Contract in a competent,
                    prompt and diligent manner;
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={10}
                  className={clsx(classes.subcontentContainer)}
                >
                  <Typography className={classes.subtitleText}>
                    4.1.6
                  </Typography>

                  <Typography
                    className={clsx(classes.subText, classes.subtitleText)}
                  >
                    not use any Alcumus logo or Accreditation Logo without the
                    prior written consent of Alcumus or in breach of the
                    obligations set out in clause 6.5;
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={10}
                  className={clsx(classes.subcontentContainer)}
                >
                  <Typography className={classes.subtitleText}>
                    4.1.7
                  </Typography>

                  <Typography
                    className={clsx(classes.subText, classes.subtitleText)}
                  >
                    not do anything to bring the reputation of Alcumus and/or
                    the SafeContractor Scheme into damage or disrepute; and
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={10}
                  className={clsx(classes.subcontentContainer)}
                >
                  <Typography className={classes.subtitleText}>
                    4.1.8
                  </Typography>

                  <Typography
                    className={clsx(classes.subText, classes.subtitleText)}
                  >
                    provide full and accurate details of the number of Employees
                    it has (in order to enable Alcumus to confirm the Charges in
                    accordance with clause 3.8) and provide Alcumus with any
                    updates to the number of Employees following a request by
                    Alcumus.
                  </Typography>
                </Grid>
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={10} className={clsx(classes.contentContainer)}>
            <Typography className={classes.subtitleText}>4.2</Typography>
            <Grid>
              <Typography
                className={clsx(classes.subText, classes.subtitleText)}
              >
                The Contractor hereby acknowledges that the provision by Alcumus
                of the Services in accordance with the Contract shall not
                absolve the Contractor from any obligation, including any
                statutory obligation relating to health and safety or otherwise,
                to which it may from time to time be subject and does not mean
                that the Contractor is compliant with all relevant legislation
                (whether in the UK or other country of origin).
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={10} className={clsx(classes.contentContainer)}>
            <Typography className={classes.subtitleText}>4.3</Typography>
            <Grid>
              <Typography
                className={clsx(classes.subText, classes.subtitleText)}
              >
                The Contractor acknowledges that Alcumus provides the Services
                in reliance on information and data provided by the Contractor.
                The Contractor is responsible entirely for the accuracy,
                relevance and completeness of all information provided in any
                form. All Accreditation assessments and checks completed by
                Alcumus are based on the Contractor’s information and Alcumus
                shall not have any duty to check the accuracy or completeness of
                such information provided. Alcumus accepts no liability for the
                incorrect provision of Services based on information provided by
                the Contractor under the Contract.
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={10} className={clsx(classes.contentContainer)}>
            <Typography className={classes.subtitleText}>4.4</Typography>
            <Grid>
              <Typography
                className={clsx(classes.subText, classes.subtitleText)}
              >
                Whilst as part of the Services Alcumus will verify certain
                documents submitted by the Contractor, it shall only verify a
                sample of the documents submitted and provides no warranty as to
                whether such documents are fit for purpose or legally compliant.
                This responsibility lies solely with the Contractor, and Alcumus
                accepts no liability in relation to the same.
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={10} className={clsx(classes.contentContainer)}>
            <Typography className={classes.subtitleText}>4.5</Typography>
            <Grid>
              <Typography
                className={clsx(classes.subText, classes.subtitleText)}
              >
                The Contractor agrees that Alcumus shall not be liable under any
                circumstances for any delay, error or problem caused by any act
                or omission on the part of the Contractor, its agents or
                employees. Alcumus may levy additional charges (at its then
                current standard rates) resulting from any additional work or
                additional costs incurred or undertaken as a consequence of any
                such act or omission.
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={10} className={clsx(classes.contentContainer)}>
            <Typography className={classes.subtitleText}>4.6</Typography>
            <Grid>
              <Typography
                className={clsx(classes.subText, classes.subtitleText)}
              >
                In the event that the Contractor fails to notify Alcumus of any
                problem or concern within five (5) Working Days of Alcumus
                carrying out the Services then the Contractor shall be deemed to
                have accepted the same.
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={10} className={clsx(classes.contentContainer)}>
            <Typography className={classes.subtitleText}>4.7</Typography>
            <Grid>
              <Typography
                className={clsx(classes.subText, classes.subtitleText)}
              >
                If Alcumus is providing Systems in accordance with the Contract,
                the Contractor shall and shall procure that any Authorised
                Users:
                <Grid
                  item
                  xs={10}
                  className={clsx(classes.subcontentContainer)}
                >
                  <Typography className={classes.subtitleText}>
                    4.7.1
                  </Typography>

                  <Typography
                    className={clsx(classes.subText, classes.subtitleText)}
                  >
                    operate any relevant Systems only in accordance with
                    Alcumus’ and/or any relevant licensor of the Systems’
                    instructions and shall ensure that no modifications are made
                    to any such Systems; and
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={10}
                  className={clsx(classes.subcontentContainer)}
                >
                  <Typography className={classes.subtitleText}>
                    4.7.2
                  </Typography>

                  <Typography
                    className={clsx(classes.subText, classes.subtitleText)}
                  >
                    supply to Alcumus a list of its Authorised Users promptly
                    upon request; and issue to each of its Authorised Users the
                    password from time to time provided by Alcumus.
                  </Typography>
                </Grid>
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={10} className={clsx(classes.contentContainer)}>
            <Typography className={classes.subtitleText}>4.8</Typography>
            <Grid>
              <Typography
                className={clsx(classes.subText, classes.subtitleText)}
              >
                The Contractor shall ensure that it keeps an up to date list of
                all Authorised Users with access to the Systems at any given
                time. The Contractor shall ensure that each Authorised User
                keeps his or her username and password confidential and does not
                at any time share any access details to the Systems with any
                other person. The Contractor shall immediately inform Alcumus
                when individual Authorised Users no longer require access to the
                Systems.
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={10} className={clsx(classes.contentContainer)}>
            <Typography className={classes.subtitleText}>4.9</Typography>
            <Grid>
              <Typography
                className={clsx(classes.subText, classes.subtitleText)}
              >
                The Contractor shall use all reasonable endeavours to prevent
                any unauthorised access to, or use of, the Systems and/or the
                Documents and, in the event of any such unauthorised access or
                use, promptly notify Alcumus. Without prejudice to any rights or
                remedies which may be available to Alcumus, if any Viruses are
                transmitted or introduced into the Systems or any IT system used
                by Alcumus in relation to the Services by (a) the Contractor; or
                (b) any Authorised User; or (c) any Unauthorised User, the
                Contractor shall promptly notify Alcumus and, unless otherwise
                directed by Alcumus, shall take any such action at its own cost
                as is reasonably necessary to eliminate such Viruses and/or
                ameliorate their effect.
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={10} className={clsx(classes.contentContainer)}>
            <Typography className={classes.subtitleText}>4.10</Typography>
            <Grid>
              <Typography
                className={clsx(classes.subText, classes.subtitleText)}
              >
                In respect of the use of any relevant Systems, the Contractor
                shall comply with generally accepted principles of internet
                usage and ensure that:
                <Grid
                  item
                  xs={10}
                  className={clsx(classes.subcontentContainer)}
                >
                  <Typography className={classes.subtitleText}>
                    4.10.1
                  </Typography>

                  <Typography
                    className={clsx(classes.subText, classes.subtitleText)}
                  >
                    such relevant Systems are not used fraudulently, in
                    connection with any criminal offence, or otherwise
                    unlawfully or to send or receive any information or material
                    which is offensive, abusive, indecent, defamatory, obscene
                    or menacing, or in breach of confidence, copyright, privacy
                    or any other rights, or to send or provide unsolicited
                    advertising or promotional material; and
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={10}
                  className={clsx(classes.subcontentContainer)}
                >
                  <Typography className={classes.subtitleText}>
                    4.10.2
                  </Typography>

                  <Typography
                    className={clsx(classes.subText, classes.subtitleText)}
                  >
                    no attempt is made to reproduce, copy, adapt, decompile,
                    disassemble, modify, reverse engineer or make error
                    connections to the Systems in whole or in part.
                  </Typography>
                </Grid>
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={10} className={clsx(classes.contentContainer)}>
            <Typography className={classes.subtitleText}>4.11</Typography>
            <Grid>
              <Typography
                className={clsx(classes.subText, classes.subtitleText)}
              >
                The Contractor acknowledges and accepts that Alcumus may be
                required by law to monitor website content and traffic and, if
                necessary, give evidence of the same together with use of log-on
                identification to support or defend any dispute or actionable
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={10} className={clsx(classes.contentContainer)}>
            <Typography className={classes.subtitleText}>4.12</Typography>
            <Grid>
              <Typography
                className={clsx(classes.subText, classes.subtitleText)}
              >
                Alcumus does not guarantee that access to the Systems shall be
                uninterrupted, or that the Systems shall be error or virus free,
                and excludes any liability in relation to the same. Alcumus
                reserves the right to undertake maintenance or emergency works
                to the Systems from time to time and where the need arises,
                suspend or close the Contractor’s access to the Systems.
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={10} className={clsx(classes.contentContainer)}>
            <Typography className={classes.subtitleText}>4.13</Typography>
            <Grid>
              <Typography
                className={clsx(classes.subText, classes.subtitleText)}
              >
                Alcumus does not provide any guarantee as to the accuracy of the
                materials and content included on the Systems from time to time,
                and is under no obligation to ensure such materials are up to
                date.
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={10} className={clsx(classes.infoContainer)}>
            <Typography className={classes.infotitle}>5.</Typography>
            <Typography className={clsx(classes.subText, classes.infotitle)}>
              ACCREDITATION PROCESS
            </Typography>
          </Grid>
          <Grid item xs={10} className={clsx(classes.contentContainer)}>
            <Typography className={classes.subtitleText}>5.1</Typography>
            <Grid>
              <Typography
                className={clsx(classes.subText, classes.subtitleText)}
              >
                On the Membership Registration Date, the Contractor shall
                achieve Membership Status and shall be entitled to all
                SafeContractor membership benefits. In respect of the Initial
                Term, at the time of payment of the Charges, the Contractor
                shall specify which Services Package it intends to purchase
                (which for the avoidance of doubt shall be one of the following
                options: (i) the Premier Package; (ii) the Assisted Package;
                (iii) the Express Package; or (iv) the Standard Package. Further
                detail regarding the Services Packages is set out in Appendix 1.
                On autorenewal, the Contractor shall renew on the same Service
                Package it received in the previous membership year. Where the
                Contractor wishes to downgrade the Service Package on
                autorenewal, it shall notify Alcumus 14 days prior to such
                autorenewal taking effect.
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={10} className={clsx(classes.contentContainer)}>
            <Typography className={classes.subtitleText}>5.2</Typography>
            <Grid>
              <Typography
                className={clsx(classes.subText, classes.subtitleText)}
              >
                Once the Contractor has Membership Status, the Contractor shall
                submit an Application by completing the health and safety
                assessment questionnaire and submitting this and all necessary
                supporting documentation to Alcumus via the Systems, by email,
                in hard copy format and/or via a SafeContractor operative.
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={10} className={clsx(classes.contentContainer)}>
            <Typography className={classes.subtitleText}>5.3</Typography>
            <Grid>
              <Typography
                className={clsx(classes.subText, classes.subtitleText)}
              >
                Once the Application is received by Alcumus, it is assessed by
                experienced professionals against the Accreditation Standards in
                accordance with the timescales set out in the relevant Services
                Package. At any time during the Application, the Contractor may
                upgrade to a different Services Package by paying the
                appropriate Charges to Alcumus. For the avoidance of doubt,
                Alcumus shall not review any Application submitted by the
                Contractor or provide any assessment support in accordance with
                the service levels set out in the Contractor’s Services Package
                unless and until the Contractor has paid the Charges in
                accordance with clause 3.1.
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={10} className={clsx(classes.contentContainer)}>
            <Typography className={classes.subtitleText}>5.4</Typography>
            <Grid>
              <Typography
                className={clsx(classes.subText, classes.subtitleText)}
              >
                Subject to the Contractor remaining a Member (by ensuring
                payment of the Charges when due), the assessment process remains
                active until the Application is deemed by Alcumus to be either:
                (i) successful and Accreditation is awarded; or (ii) complete
                and Accreditation has been rejected.
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={10} className={clsx(classes.contentContainer)}>
            <Typography className={classes.subtitleText}>5.5</Typography>
            <Grid>
              <Typography
                className={clsx(classes.subText, classes.subtitleText)}
              >
                All information submitted as part of an Application must be in
                English. Alcumus reserves the right to reject any information
                submitted in another language. For the avoidance of doubt, where
                the Contractor is unable to provide a copy of a particular
                document requested by Alcumus, Alcumus shall record that no such
                document was provided.
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={10} className={clsx(classes.contentContainer)}>
            <Typography className={classes.subtitleText}>5.6</Typography>
            <Grid>
              <Typography
                className={clsx(classes.subText, classes.subtitleText)}
              >
                The purpose of the assessment process is to determine the
                organisational capability of the Contractor and not that of any
                third party consultant. It is acknowledged that where health and
                safety expertise is not available to the Contractor internally,
                external advice may be sought however, this advice must be
                assimilated into the Contractor’s business operations. Alcumus
                reserves the right to refuse an Application submitted by a third
                party consultant, which may result in the Contractor being
                removed from the Master List, any Approved List and/or the
                SafeContractor Scheme, and/or losing its Membership Status.
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={10} className={clsx(classes.contentContainer)}>
            <Typography className={classes.subtitleText}>5.7</Typography>
            <Grid>
              <Typography
                className={clsx(classes.subText, classes.subtitleText)}
              >
                The assessment process is intended to encourage and support the
                Contractor throughout, however, this is subject to any specific
                response timescales relating to the SafeContractor Scheme as set
                out in the Services Packages.
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={10} className={clsx(classes.contentContainer)}>
            <Typography className={classes.subtitleText}>5.8</Typography>
            <Grid>
              <Typography
                className={clsx(classes.subText, classes.subtitleText)}
              >
                Where an Application is unsuccessful, feedback is provided to
                the Contractor identifying areas of non-conformance, together
                with recommendations of actions required to achieve
                Accreditation.
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={10} className={clsx(classes.contentContainer)}>
            <Typography className={classes.subtitleText}>5.9</Typography>
            <Grid>
              <Typography
                className={clsx(classes.subText, classes.subtitleText)}
              >
                The Accreditation Standards are set by Alcumus’ technical
                accreditation team (and at Alcumus’ option) in conjunction with
                external specialists and Clients (where deemed appropriate). A
                full technical review is undertaken every six months, and
                Alcumus reserves the right to amend the Accreditation Standards
                at any time to ensure that they remain appropriate, continue to
                meet legislative and industry best practice requirements, and
                reflect Client needs.
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={10} className={clsx(classes.contentContainer)}>
            <Typography className={classes.subtitleText}>5.10</Typography>
            <Grid>
              <Typography
                className={clsx(classes.subText, classes.subtitleText)}
              >
                On renewal of any Accreditation the Contractor shall be assessed
                against the then current Accreditation Standards.
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={10} className={clsx(classes.contentContainer)}>
            <Typography className={classes.subtitleText}>5.11</Typography>
            <Grid>
              <Typography
                className={clsx(classes.subText, classes.subtitleText)}
              >
                Accreditation is awarded on the date that the assessor is
                satisfied that the Accreditation Standards have been met in
                accordance with this clause 5 (“Accreditation Date”).
                Accreditation is valid for a minimum period of 12 months
                commencing on the Accreditation Date, subject to clause 8.1 and
                the Contractor remaining a Member (by ensuring payment of the
                Charges when due). Alcumus has discretion to award an
                Accreditation for a period longer than 12 months in certain
                circumstances.
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={10} className={clsx(classes.contentContainer)}>
            <Typography className={classes.subtitleText}>5.12</Typography>
            <Grid>
              <Typography
                className={clsx(classes.subText, classes.subtitleText)}
              >
                It remains the Contractor’s responsibility to ensure ongoing
                compliance with the Accreditation Standards throughout the
                period of Accreditation. Alcumus reserves the right to undertake
                ongoing or spot check compliance monitoring. Failure to ensure
                ongoing compliance may result in the Accreditation being
                removed.
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={10} className={clsx(classes.contentContainer)}>
            <Typography className={classes.subtitleText}>5.13</Typography>
            <Grid>
              <Typography
                className={clsx(classes.subText, classes.subtitleText)}
              >
                Alcumus reserves the right to reassess the Contractor at any
                time during the period of Accreditation and Alcumus reserves the
                right to charge the Contractor additional charges for such
                reassessment.
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={10} className={clsx(classes.contentContainer)}>
            <Typography className={classes.subtitleText}>5.14</Typography>
            <Grid>
              <Typography
                className={clsx(classes.subText, classes.subtitleText)}
              >
                Alcumus reserves the right to undertake a financial assessment
                of the Contractor’s business to ascertain financial stability.
                As part of this financial assessment, in the case of Contractors
                who are limited companies, limited liability partnerships or
                public limited companies, Alcumus may undertake a credit
                reference check via a third party supplier. The credit reference
                check shall allow Alcumus to obtain the following information:
                <Grid
                  item
                  xs={10}
                  className={clsx(classes.subcontentContainer)}
                >
                  <Typography className={classes.subtitleText}>
                    5.14.1
                  </Typography>

                  <Typography
                    className={clsx(classes.subText, classes.subtitleText)}
                  >
                    public data on the Contractor’s credit behaviour;
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={10}
                  className={clsx(classes.subcontentContainer)}
                >
                  <Typography className={classes.subtitleText}>
                    5.14.2
                  </Typography>

                  <Typography
                    className={clsx(classes.subText, classes.subtitleText)}
                  >
                    information on the conduct of the Contractor’s credit
                    accounts;
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={10}
                  className={clsx(classes.subcontentContainer)}
                >
                  <Typography className={classes.subtitleText}>
                    5.14.3
                  </Typography>

                  <Typography
                    className={clsx(classes.subText, classes.subtitleText)}
                  >
                    information on the financial stability and credit worthiness
                    of the Contractor.
                  </Typography>
                </Grid>
                In accepting these Conditions, the Contractor authorises Alcumus
                to undertake the financial assessment and credit reference check
                outlined above.
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={10} className={clsx(classes.contentContainer)}>
            <Typography className={classes.subtitleText}>5.15</Typography>
            <Grid>
              <Typography
                className={clsx(classes.subText, classes.subtitleText)}
              >
                The Contractor warrants to Alcumus that:
                <Grid
                  item
                  xs={10}
                  className={clsx(classes.subcontentContainer)}
                >
                  <Typography className={classes.subtitleText}>
                    5.15.1
                  </Typography>

                  <Typography
                    className={clsx(classes.subText, classes.subtitleText)}
                  >
                    all information and supporting documents provided to Alcumus
                    (whether during the Application process or otherwise) are
                    true, complete and accurate;
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={10}
                  className={clsx(classes.subcontentContainer)}
                >
                  <Typography className={classes.subtitleText}>
                    5.15.2
                  </Typography>

                  <Typography
                    className={clsx(classes.subText, classes.subtitleText)}
                  >
                    all information that is material to the Accreditation has
                    been provided;
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={10}
                  className={clsx(classes.subcontentContainer)}
                >
                  <Typography className={classes.subtitleText}>
                    5.15.3
                  </Typography>

                  <Typography
                    className={clsx(classes.subText, classes.subtitleText)}
                  >
                    all information is provided with the full authority and
                    consent of the Contractor (or relevant employee(s), where
                    applicable),
                  </Typography>
                </Grid>
                and Alcumus shall not be liable to the Contractor or any third
                party reliant on any information supplied by the Contractor
                which proves to be incorrect or fraudulent or in breach of the
                above warranties.
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={10} className={clsx(classes.infoContainer)}>
            <Typography className={classes.infotitle}>6.</Typography>
            <Typography className={clsx(classes.subText, classes.infotitle)}>
              ACCREDITATION
            </Typography>
          </Grid>
          <Grid item xs={10} className={clsx(classes.contentContainer)}>
            <Typography className={classes.subtitleText}>6.1</Typography>
            <Grid>
              <Typography
                className={clsx(classes.subText, classes.subtitleText)}
              >
                On Accreditation, Alcumus shall, subject to clause 6.9, add the
                Contractor to the Master List. Inclusion onto the Master List is
                at the sole discretion of Alcumus and is dependent on, but not
                exclusively, achievement of the Accreditation Standards.
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={10} className={clsx(classes.contentContainer)}>
            <Typography className={classes.subtitleText}>6.2</Typography>
            <Grid>
              <Typography
                className={clsx(classes.subText, classes.subtitleText)}
              >
                Inclusion onto an Approved List is at the sole discretion of the
                applicable Client and is dependent on, but not exclusively,
                achievement of the Accreditation Standards and is subject to
                clause 6.10.
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={10} className={clsx(classes.contentContainer)}>
            <Typography className={classes.subtitleText}>6.3</Typography>
            <Grid>
              <Typography
                className={clsx(classes.subText, classes.subtitleText)}
              >
                Inclusion onto the Master List or an Approved List does not in
                any way constitute or guarantee tenders or offers of work.
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={10} className={clsx(classes.contentContainer)}>
            <Typography className={classes.subtitleText}>6.4</Typography>
            <Grid>
              <Typography
                className={clsx(classes.subText, classes.subtitleText)}
              >
                Access to the Systems is controlled and secured by individual
                passwords and Alcumus reserves the right to withdraw this access
                at any time.
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={10} className={clsx(classes.contentContainer)}>
            <Typography className={classes.subtitleText}>6.5</Typography>
            <Grid>
              <Typography
                className={clsx(classes.subText, classes.subtitleText)}
              >
                The Contractor shall only be entitled to use the Accreditation
                Logo during any period that it is an Accredited Member. If at
                any point the Accreditation or Membership Status expires or is
                withdrawn, the Contractor shall immediately cease to use the
                Accreditation Logo. Where the Contractor fails to comply with
                the Accreditation Logo usage rules, or falsely passes itself off
                as holding Accreditation, this may result in legal action or
                immediate termination of the Contract by Alcumus. For the
                avoidance of doubt, during any period where the Contractor holds
                Membership Status but is not an Accredited Member, it shall not
                be permitted to use the Accreditation Logo or pass itself off as
                being an Accredited Member.
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={10} className={clsx(classes.contentContainer)}>
            <Typography className={classes.subtitleText}>6.6</Typography>
            <Grid>
              <Typography
                className={clsx(classes.subText, classes.subtitleText)}
              >
                Alcumus reserves the right to review and expand the categories
                of work listed on the Systems from time to time at its
                discretion.
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={10} className={clsx(classes.contentContainer)}>
            <Typography className={classes.subtitleText}>6.7</Typography>
            <Grid>
              <Typography
                className={clsx(classes.subText, classes.subtitleText)}
              >
                The Contractor shall promptly notify Alcumus of any information
                that may impact its Application and/or Accreditation, including
                but not limited to:
                <Grid
                  item
                  xs={10}
                  className={clsx(classes.subcontentContainer)}
                >
                  <Typography className={classes.subtitleText}>
                    6.7.1
                  </Typography>

                  <Typography
                    className={clsx(classes.subText, classes.subtitleText)}
                  >
                    details of any enforcement action, including statutory
                    notices, informal written notices and prosecutions;
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={10}
                  className={clsx(classes.subcontentContainer)}
                >
                  <Typography className={classes.subtitleText}>
                    6.7.2
                  </Typography>

                  <Typography
                    className={clsx(classes.subText, classes.subtitleText)}
                  >
                    any civil action associated with health and safety
                    incidents;
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={10}
                  className={clsx(classes.subcontentContainer)}
                >
                  <Typography className={classes.subtitleText}>
                    6.7.3
                  </Typography>

                  <Typography
                    className={clsx(classes.subText, classes.subtitleText)}
                  >
                    major accidents;
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={10}
                  className={clsx(classes.subcontentContainer)}
                >
                  <Typography className={classes.subtitleText}>
                    6.7.4
                  </Typography>

                  <Typography
                    className={clsx(classes.subText, classes.subtitleText)}
                  >
                    any significant new work activities undertaken;
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={10}
                  className={clsx(classes.subcontentContainer)}
                >
                  <Typography className={classes.subtitleText}>
                    6.7.5
                  </Typography>

                  <Typography
                    className={clsx(classes.subText, classes.subtitleText)}
                  >
                    changes to insurance policies including withdrawals,
                    cancellations or avoidance (and in respect of professional
                    indemnity insurance, the Contractor shall advise Alcumus
                    immediately of any changes in the number of claims that can
                    be made against the policy or changes in excesses);
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={10}
                  className={clsx(classes.subcontentContainer)}
                >
                  <Typography className={classes.subtitleText}>
                    6.7.6
                  </Typography>

                  <Typography
                    className={clsx(classes.subText, classes.subtitleText)}
                  >
                    any complaints about health and safety or environmental
                    performance;
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={10}
                  className={clsx(classes.subcontentContainer)}
                >
                  <Typography className={classes.subtitleText}>
                    6.7.7
                  </Typography>

                  <Typography
                    className={clsx(classes.subText, classes.subtitleText)}
                  >
                    any changes to the financial standing of the Contractor
                    including where the events set out in clause 15.4.2 and
                    clause 15.4.3 apply or are likely to apply;
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={10}
                  className={clsx(classes.subcontentContainer)}
                >
                  <Typography className={classes.subtitleText}>
                    6.7.8
                  </Typography>

                  <Typography
                    className={clsx(classes.subText, classes.subtitleText)}
                  >
                    any act or occurrence or information which the Contractor,
                    acting reasonably, believes may impact their Membership
                    Status, Application and/or Accreditation; and
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={10}
                  className={clsx(classes.subcontentContainer)}
                >
                  <Typography className={classes.subtitleText}>
                    6.7.9
                  </Typography>

                  <Typography
                    className={clsx(classes.subText, classes.subtitleText)}
                  >
                    any breach of clause 8.1,
                  </Typography>
                </Grid>
                and for the avoidance of doubt, where any notification is
                provided under this clause 6.7 or Alcumus otherwise becomes
                aware that any of the circumstances in clauses 6.7.1 – 6.7.9
                apply, Alcumus may inform any Client where the Contractor is
                included on such Client’s Approved List.
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={10} className={clsx(classes.contentContainer)}>
            <Typography className={classes.subtitleText}>6.8</Typography>
            <Grid>
              <Typography
                className={clsx(classes.subText, classes.subtitleText)}
              >
                Alcumus reserves the right to modify, adjust, suspend or cancel
                an Accreditation (without refund) upon receipt of additional
                relevant information (from any source) that may be seen to
                affect the Accreditation, and reserves the right to charge
                additional fees for reassessing or reverifying an Application or
                reviewing a new Application following receipt of additional
                information (provided this shall always be agreed in advance
                with the Contractor).
              </Typography>
            </Grid>
          </Grid>

          <Grid item xs={10} className={clsx(classes.contentContainer)}>
            <Typography className={classes.subtitleText}>6.9</Typography>
            <Grid>
              <Typography
                className={clsx(classes.subText, classes.subtitleText)}
              >
                Access onto the Master List is at the sole discretion of
                Alcumus, and Alcumus has the discretion to perform any of the
                following functions:
                <Grid
                  item
                  xs={10}
                  className={clsx(classes.subcontentContainer)}
                >
                  <Typography className={classes.subtitleText}>
                    6.9.1
                  </Typography>

                  <Typography
                    className={clsx(classes.subText, classes.subtitleText)}
                  >
                    refuse the Contractor access to the Master List;
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={10}
                  className={clsx(classes.subcontentContainer)}
                >
                  <Typography className={classes.subtitleText}>
                    6.9.2
                  </Typography>

                  <Typography
                    className={clsx(classes.subText, classes.subtitleText)}
                  >
                    suspend the Contractor’s access to the Master List;
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={10}
                  className={clsx(classes.subcontentContainer)}
                >
                  <Typography className={classes.subtitleText}>
                    6.9.3
                  </Typography>

                  <Typography
                    className={clsx(classes.subText, classes.subtitleText)}
                  >
                    remove the Contractor from the Master List;
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={10}
                  className={clsx(classes.subcontentContainer)}
                >
                  <Typography className={classes.subtitleText}>
                    6.9.4
                  </Typography>

                  <Typography
                    className={clsx(classes.subText, classes.subtitleText)}
                  >
                    limit the total number of contractors on the Master List;
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={10}
                  className={clsx(classes.subcontentContainer)}
                >
                  <Typography className={classes.subtitleText}>
                    6.9.5
                  </Typography>

                  <Typography
                    className={clsx(classes.subText, classes.subtitleText)}
                  >
                    limit the number of work categories on the Master List;
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={10}
                  className={clsx(classes.subcontentContainer)}
                >
                  <Typography className={classes.subtitleText}>
                    6.9.6
                  </Typography>

                  <Typography
                    className={clsx(classes.subText, classes.subtitleText)}
                  >
                    set specific criteria for inclusion on the Master List;
                    and/or
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={10}
                  className={clsx(classes.subcontentContainer)}
                >
                  <Typography className={classes.subtitleText}>
                    6.9.7
                  </Typography>

                  <Typography
                    className={clsx(classes.subText, classes.subtitleText)}
                  >
                    close the Master List,
                  </Typography>
                </Grid>
                and Alcumus shall not be under any obligation to inform the
                Contractor of its decision to enforce any of the stipulations
                set out above.{' '}
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={10} className={clsx(classes.contentContainer)}>
            <Typography className={classes.subtitleText}>6.10</Typography>
            <Grid>
              <Typography
                className={clsx(classes.subText, classes.subtitleText)}
              >
                Access onto a specific Approved List is at the sole discretion
                of the Client, and at the Client’s request, Alcumus has the
                discretion to perform any of the following functions:
                <Grid
                  item
                  xs={10}
                  className={clsx(classes.subcontentContainer)}
                >
                  <Typography className={classes.subtitleText}>
                    6.10.1
                  </Typography>

                  <Typography
                    className={clsx(classes.subText, classes.subtitleText)}
                  >
                    refuse the Contractor access to an Approved List;
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={10}
                  className={clsx(classes.subcontentContainer)}
                >
                  <Typography className={classes.subtitleText}>
                    6.10.2
                  </Typography>

                  <Typography
                    className={clsx(classes.subText, classes.subtitleText)}
                  >
                    suspend the Contractor’s access to an Approved List;
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={10}
                  className={clsx(classes.subcontentContainer)}
                >
                  <Typography className={classes.subtitleText}>
                    6.10.3
                  </Typography>

                  <Typography
                    className={clsx(classes.subText, classes.subtitleText)}
                  >
                    remove the Contractor from an Approved List;
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={10}
                  className={clsx(classes.subcontentContainer)}
                >
                  <Typography className={classes.subtitleText}>
                    6.10.4
                  </Typography>

                  <Typography
                    className={clsx(classes.subText, classes.subtitleText)}
                  >
                    limit the total number of contractors on an Approved List;
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={10}
                  className={clsx(classes.subcontentContainer)}
                >
                  <Typography className={classes.subtitleText}>
                    6.10.5
                  </Typography>

                  <Typography
                    className={clsx(classes.subText, classes.subtitleText)}
                  >
                    limit the number of work categories on an Approved List;
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={10}
                  className={clsx(classes.subcontentContainer)}
                >
                  <Typography className={classes.subtitleText}>
                    6.10.6
                  </Typography>

                  <Typography
                    className={clsx(classes.subText, classes.subtitleText)}
                  >
                    set specific criteria for inclusion on an Approved List;
                    and/or
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={10}
                  className={clsx(classes.subcontentContainer)}
                >
                  <Typography className={classes.subtitleText}>
                    6.10.7
                  </Typography>

                  <Typography
                    className={clsx(classes.subText, classes.subtitleText)}
                  >
                    close any Approved List,
                  </Typography>
                </Grid>
                and Alcumus shall not be under any obligation to inform the
                Contractor of the Client’s decision to enforce any of the
                stipulations set out above.
              </Typography>
            </Grid>
          </Grid>

          <Grid item xs={10} className={clsx(classes.infoContainer)}>
            <Typography className={classes.infotitle}>7.</Typography>
            <Typography className={clsx(classes.subText, classes.infotitle)}>
              ACCREDITATION RENEWALS
            </Typography>
          </Grid>
          <Grid item xs={10} className={clsx(classes.contentContainer)}>
            <Typography className={classes.subtitleText}>7.1</Typography>
            <Grid>
              <Typography
                className={clsx(classes.subText, classes.subtitleText)}
              >
                Membership Status shall be renewable on an annual basis and
                shall automatically renew for successive years in accordance
                with clause 15.1. The annual Membership renewal date shall be
                the date that is 12 months after the Membership Registration
                Date (“Membership Renewal Date”). If payment of the Charges is
                not received by the Membership Renewal Date, Alcumus reserves
                the right to suspend visibility of the Contractor from the
                Systems, place the Contractor into ‘at risk’ status on the
                Client Portal, remove the Contractor from the Master List or an
                Approved List, withdraw or suspend any Accreditation, withdraw
                or suspend any right to use the Accreditation Logo, and cease to
                conduct any assessment activity until payment is received in
                full and cleared funds.
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={10} className={clsx(classes.contentContainer)}>
            <Typography className={classes.subtitleText}>7.2</Typography>
            <Grid>
              <Typography
                className={clsx(classes.subText, classes.subtitleText)}
              >
                Accreditation shall be renewable on an annual basis and, subject
                to the Contractor maintaining its Membership Status in
                accordance with clause 7.1, and to the Contractor submitting all
                required documents to Alcumus in good time to allow Alcumus to
                respond in accordance with the timescales outlined in the
                applicable Services Package, Alcumus shall carry out an annual
                review around 12 months from the Accreditation Date, to ensure
                that the Contractor maintains compliance with the Accreditation
                Standards. Upon satisfactory reassessment, the Accreditation
                shall be extended for a further 12-month period from the date
                the reassessment is approved. Following successful
                Accreditation, a new certificate shall be issued to the
                Contractor. The annual review date of the Accreditation may not
                coincide with the annual renewal date of Membership Status.
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={10} className={clsx(classes.infoContainer)}>
            <Typography className={classes.infotitle}>8.</Typography>
            <Typography className={clsx(classes.subText, classes.infotitle)}>
              REMOVALS
            </Typography>
          </Grid>
          <Grid item xs={10} className={clsx(classes.contentContainer)}>
            <Typography className={classes.subtitleText}>8.1</Typography>
            <Grid>
              <Typography
                className={clsx(classes.subText, classes.subtitleText)}
              >
                The Contractor’s failure to comply with any of the following may
                result in the Contractor’s removal or suspension from the
                SafeContractor Scheme:
                <Grid
                  item
                  xs={10}
                  className={clsx(classes.subcontentContainer)}
                >
                  <Typography className={classes.subtitleText}>
                    8.1.1
                  </Typography>

                  <Typography
                    className={clsx(classes.subText, classes.subtitleText)}
                  >
                    maintain as a minimum the same level of insurance as at the
                    time of Accreditation or upgrade, and notify Alcumus of any
                    change to such insurance;
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={10}
                  className={clsx(classes.subcontentContainer)}
                >
                  <Typography className={classes.subtitleText}>
                    8.1.2
                  </Typography>

                  <Typography
                    className={clsx(classes.subText, classes.subtitleText)}
                  >
                    provide updated insurance documents to support an
                    Application for renewal;
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={10}
                  className={clsx(classes.subcontentContainer)}
                >
                  <Typography className={classes.subtitleText}>
                    8.1.3
                  </Typography>

                  <Typography
                    className={clsx(classes.subText, classes.subtitleText)}
                  >
                    provide all information in clear and legible form, and in
                    the English language;
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={10}
                  className={clsx(classes.subcontentContainer)}
                >
                  <Typography className={classes.subtitleText}>
                    8.1.4
                  </Typography>

                  <Typography
                    className={clsx(classes.subText, classes.subtitleText)}
                  >
                    pay all Charges on time (including any Charges payable where
                    the Contract auto renews in accordance with clause 15.1);
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={10}
                  className={clsx(classes.subcontentContainer)}
                >
                  <Typography className={classes.subtitleText}>
                    8.1.5
                  </Typography>

                  <Typography
                    className={clsx(classes.subText, classes.subtitleText)}
                  >
                    ensure that falsified or fraudulent documentation or
                    information is not provided as part of any Application;
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={10}
                  className={clsx(classes.subcontentContainer)}
                >
                  <Typography className={classes.subtitleText}>
                    8.1.6
                  </Typography>

                  <Typography
                    className={clsx(classes.subText, classes.subtitleText)}
                  >
                    comply with all relevant and applicable laws relating to the
                    registration and Accreditation processes;
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={10}
                  className={clsx(classes.subcontentContainer)}
                >
                  <Typography className={classes.subtitleText}>
                    8.1.7
                  </Typography>

                  <Typography
                    className={clsx(classes.subText, classes.subtitleText)}
                  >
                    notify Alcumus of any of the information required under
                    clause 6.7; and/or 8.1.8comply with all applicable
                    legislation, not be found guilty of a criminal offence, and
                    not carry out any act
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={10}
                  className={clsx(classes.subcontentContainer)}
                >
                  <Typography className={classes.subtitleText}>
                    8.1.8
                  </Typography>

                  <Typography
                    className={clsx(classes.subText, classes.subtitleText)}
                  >
                    comply with all applicable legislation, not be found guilty
                    of a criminal offence, and not carry out any act
                  </Typography>
                </Grid>
              </Typography>
            </Grid>
          </Grid>

          <Grid item xs={10} className={clsx(classes.contentContainer)}>
            <Typography className={classes.subtitleText}>8.2</Typography>
            <Grid>
              <Typography
                className={clsx(classes.subText, classes.subtitleText)}
              >
                Where the Contractor fails to achieve Accreditation, or where
                Alcumus removes or suspends the Contractor from the
                SafeContractor Scheme, Alcumus may provide reasons for this
                together with any evidence to any Client in respect of whom the
                Contractor is on, or due to be added to, their Approved List,
                and the Contractor consents to any such information being
                provided to any Client in accordance with this clause.
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={10} className={clsx(classes.contentContainer)}>
            <Typography className={classes.subtitleText}>8.3</Typography>
            <Grid>
              <Typography
                className={clsx(classes.subText, classes.subtitleText)}
              >
                Alcumus reserves the right to suspend or remove the Contractor
                from the SafeContractor Scheme, without refund, should it be
                deemed necessary to protect the SafeContractor Scheme, the
                Contractor or any Client.
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={10} className={clsx(classes.contentContainer)}>
            <Typography className={classes.subtitleText}>8.4</Typography>
            <Grid>
              <Typography
                className={clsx(classes.subText, classes.subtitleText)}
              >
                Where the Contractor is suspended or removed from the
                SafeContractor Scheme, Alcumus reserves the right to state a
                time frame within which new Applications by that Contractor may
                not be submitted.
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={10} className={clsx(classes.infoContainer)}>
            <Typography className={classes.infotitle}>9.</Typography>
            <Typography className={clsx(classes.subText, classes.infotitle)}>
              RESERVATION OF TITLE
            </Typography>
          </Grid>
          <Grid item xs={10} className={clsx(classes.contentContainer)}>
            <Typography className={classes.subtitleText}>9.1</Typography>
            <Grid>
              <Typography
                className={clsx(classes.subText, classes.subtitleText)}
              >
                Title to the Systems shall remain vested in Alcumus at all
                times.
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={10} className={clsx(classes.contentContainer)}>
            <Typography className={classes.subtitleText}>9.2</Typography>
            <Grid>
              <Typography
                className={clsx(classes.subText, classes.subtitleText)}
              >
                Alcumus shall be entitled to remove access to any Systems at any
                time (including but not limited to the case of termination of
                the Contract).
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={10} className={clsx(classes.infoContainer)}>
            <Typography className={classes.infotitle}>10.</Typography>
            <Typography className={clsx(classes.subText, classes.infotitle)}>
              DATA PROTECTION
            </Typography>
          </Grid>
          <Grid item xs={10} className={clsx(classes.contentContainer)}>
            <Typography className={classes.subtitleText}></Typography>
            <Grid>
              <Typography
                className={clsx(classes.subText, classes.subtitleText)}
              >
                <Grid
                  item
                  xs={10}
                  className={clsx(classes.subcontentContainer)}
                >
                  <Typography className={classes.subtitleText}>
                    10.1.1
                  </Typography>

                  <Typography
                    className={clsx(classes.subText, classes.subtitleText)}
                  >
                    &quot;personal data&quot;, &quot;data controller&quot;,
                    &quot;data processor&quot;, &quot;data subject&quot; and
                    &quot;process&quot; or &quot;processing&quot; each have the
                    same meaning as used in the Data Protection Laws;
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={10}
                  className={clsx(classes.subcontentContainer)}
                >
                  <Typography className={classes.subtitleText}>
                    10.1.2
                  </Typography>

                  <Typography
                    className={clsx(classes.subText, classes.subtitleText)}
                  >
                    ‘Contractor Personal Data’ means any and all personal data
                    which is provided by or on behalf of the Contractor to
                    Alcumus or which is otherwise processed by Alcumus as a
                    result of or in connection with the provision of the
                    Services;
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={10}
                  className={clsx(classes.subcontentContainer)}
                >
                  <Typography className={classes.subtitleText}>
                    10.1.3
                  </Typography>

                  <Typography
                    className={clsx(classes.subText, classes.subtitleText)}
                  >
                    &quot;Data Protection Laws&quot; means the Data Protection
                    Act 2018, the Privacy and Electronic Communications (EC
                    Directive) Regulations 2003, Regulation (EU) 2016/679 on the
                    protection of natural persons with regard to the processing
                    of personal data and on the free movement of such data as it
                    applies in the UK (commonly known as the &quot;UK
                    GDPR&quot;), together with any and all other laws,
                    regulations or other statutory instruments relating to the
                    protection of personal data applicable to Alcumus and/or the
                    Contractor in any relevant jurisdiction.
                  </Typography>
                </Grid>
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={10} className={clsx(classes.contentContainer)}>
            <Typography className={classes.subtitleText}>10.2</Typography>
            <Grid>
              <Typography
                className={clsx(classes.subText, classes.subtitleText)}
              >
                The parties agree that, with respect to the parties&apos; rights
                and obligations under the Contract and with respect to any
                Contractor Personal Data, the Contractor and Alcumus shall each
                be a separate and independent data controller and the parties
                shall each comply with all applicable obligations under the Data
                Protection Laws.
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={10} className={clsx(classes.contentContainer)}>
            <Typography className={classes.subtitleText}>10.3</Typography>
            <Grid>
              <Typography
                className={clsx(classes.subText, classes.subtitleText)}
              >
                Neither party shall do, fail to do or permit to be done,
                anything that causes the other party to be in breach of their
                respective obligations under the Data Protection Laws.
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={10} className={clsx(classes.contentContainer)}>
            <Typography className={classes.subtitleText}>10.4</Typography>
            <Grid>
              <Typography
                className={clsx(classes.subText, classes.subtitleText)}
              >
                The Contractor is solely responsible for establishing the lawful
                basis for the processing of Contractor Personal Data by Alcumus
                under the Contract, including but not limited to, the sharing of
                Contractor Personal Data with Alcumus and providing where
                requested by Alcumus a copy of the Alcumus privacy policy and
                where applicable, the obtaining of all necessary consents from
                data subjects.
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={10} className={clsx(classes.contentContainer)}>
            <Typography className={classes.subtitleText}>10.5</Typography>
            <Grid>
              <Typography
                className={clsx(classes.subText, classes.subtitleText)}
              >
                To the extent that the Contractor Personal Data includes
                personal data relating to data subjects other than the
                Contractor (for example but without limitation where the data
                subject is an employee of the Contractor), the Contractor shall
                ensure that it meets all the transparency related obligations
                including by giving data subjects appropriate privacy notices in
                relation to the processing of contractor personal data by
                Alcumus.
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={10} className={clsx(classes.contentContainer)}>
            <Typography className={classes.subtitleText}>10.6</Typography>
            <Grid>
              <Typography
                className={clsx(classes.subText, classes.subtitleText)}
              >
                The Contractor shall indemnify and keep indemnified Alcumus in
                full and hold it harmless on demand from and against any claims,
                losses, costs, fines or damages suffered or incurred by Alcumus
                or for which Alcumus may become liable arising out of or in
                connection with any breach of this clause 10 by the Contractor.
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={10} className={clsx(classes.contentContainer)}>
            <Typography className={classes.subtitleText}>10.7</Typography>
            <Grid>
              <Typography
                className={clsx(classes.subText, classes.subtitleText)}
              >
                For the avoidance of doubt, Alcumus may use the Contractor’s
                data (including any personal data relating to the Contractor
                and/or its employees or agents) as follows:
                <Grid
                  item
                  xs={10}
                  className={clsx(classes.subcontentContainer)}
                >
                  <Typography className={classes.subtitleText}>
                    10.7.1
                  </Typography>

                  <Typography
                    className={clsx(classes.subText, classes.subtitleText)}
                  >
                    Alcumus may display the Contractor’s information on the
                    portal operated by The Safety Schemes in Procurement (SSIP)
                    Limited, including but not limited to the Contractor’s
                    company name (or trading name if a sole trader or
                    partnership), address, Accreditation details and scope of
                    work; and/or
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={10}
                  className={clsx(classes.subcontentContainer)}
                >
                  <Typography className={classes.subtitleText}>
                    10.7.2
                  </Typography>

                  <Typography
                    className={clsx(classes.subText, classes.subtitleText)}
                  >
                    where the Contractor is on the Approved List of a Client who
                    purchases other services from Alcumus (including but not
                    limited to e-Permits or an Info Exchange system), Alcumus
                    may display the Contractor’s company data on such system in
                    addition to on the Client Portal and/or Systems; and/or
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={10}
                  className={clsx(classes.subcontentContainer)}
                >
                  <Typography className={classes.subtitleText}>
                    10.7.3
                  </Typography>

                  <Typography
                    className={clsx(classes.subText, classes.subtitleText)}
                  >
                    Alcumus may share the Contractor’s contact details with a
                    third party organisation that provides member benefits.
                  </Typography>
                </Grid>
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={10} className={clsx(classes.infoContainer)}>
            <Typography className={classes.infotitle}>11.</Typography>
            <Typography className={clsx(classes.subText, classes.infotitle)}>
              INTELLECTUAL PROPERTY
            </Typography>
          </Grid>
          <Grid item xs={10} className={clsx(classes.contentContainer)}>
            <Typography className={classes.subtitleText}>11.1</Typography>
            <Grid>
              <Typography
                className={clsx(classes.subText, classes.subtitleText)}
              >
                Alcumus shall retain all IP relating to the Services and in any
                and all Documents, the Systems, any other systems, methods,
                material and items created by or on behalf of Alcumus whether
                specifically for the purposes of the Contract or otherwise.
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={10} className={clsx(classes.contentContainer)}>
            <Typography className={classes.subtitleText}>11.2</Typography>
            <Grid>
              <Typography
                className={clsx(classes.subText, classes.subtitleText)}
              >
                Alcumus hereby grants the Contractor a royalty-free,
                non-exclusive and revocable licence to use the Systems for the
                sole purpose of receiving the Services for the duration of the
                Term.
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={10} className={clsx(classes.contentContainer)}>
            <Typography className={classes.subtitleText}>11.3</Typography>
            <Grid>
              <Typography
                className={clsx(classes.subText, classes.subtitleText)}
              >
                Alcumus hereby grants the Contractor a royalty free,
                non-exclusive and revocable licence to use the Accreditation
                Logo, subject to clause 6.5, for the duration that the
                Contractor is an Accredited Member.
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={10} className={clsx(classes.contentContainer)}>
            <Typography className={classes.subtitleText}>11.4</Typography>
            <Grid>
              <Typography
                className={clsx(classes.subText, classes.subtitleText)}
              >
                The Contractor hereby acknowledges that Alcumus shall have no
                liability for any misuse by or on behalf of the Contractor, or
                any other person, of any of the Documents (which shall be
                determined by reference to the purposes for which the Documents
                were originally prepared), the Accreditation Logo or any other
                deliverables generated during the provision of the Services.
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={10} className={clsx(classes.contentContainer)}>
            <Typography className={classes.subtitleText}>11.5</Typography>
            <Grid>
              <Typography
                className={clsx(classes.subText, classes.subtitleText)}
              >
                The Contractor hereby grants Alcumus a royalty-free,
                non-exclusive and irrevocable licence to copy and use any
                Documents provided by the Contractor for all reasonable purposes
                related to the Services and to make such Documents available to
                the Client upon request by the Client (whether via the Systems,
                Client Portal or via other electronic or hard copy format) and
                to all Clients via the Master List.
              </Typography>
            </Grid>
          </Grid>

          <Grid item xs={10} className={clsx(classes.contentContainer)}>
            <Typography className={classes.subtitleText}>11.6</Typography>
            <Grid>
              <Typography
                className={clsx(classes.subText, classes.subtitleText)}
              >
                The Contractor shall not use the Systems, Documents or any
                deliverables resulting from the Services for any purpose
                whatsoever other than as necessary to receive the Services.
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={10} className={clsx(classes.contentContainer)}>
            <Typography className={classes.subtitleText}>11.7</Typography>
            <Grid>
              <Typography
                className={clsx(classes.subText, classes.subtitleText)}
              >
                The Contractor hereby agrees to fully indemnify and hold Alcumus
                harmless in respect of any third party claims brought against
                Alcumus as a result of or relating to the use of any IP provided
                by the Contractor to Alcumus under the Contract.
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={10} className={clsx(classes.contentContainer)}>
            <Typography className={classes.subtitleText}>11.8</Typography>
            <Grid>
              <Typography
                className={clsx(classes.subText, classes.subtitleText)}
              >
                The Contractor shall not be entitled to rely on the content of
                the Documents, assessments or any other deliverables or
                information provided by Alcumus during the Contract outside of
                the Term of the Contract or for any reason during the Term other
                than for its own usual business purposes and/or the purpose for
                which they were originally provided. Alcumus accepts no
                liability for use of the Documents, assessments and any other
                information provided to the Contractor other than during the
                Term.{' '}
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={10} className={clsx(classes.contentContainer)}>
            <Typography className={classes.subtitleText}>11.9</Typography>
            <Grid>
              <Typography
                className={clsx(classes.subText, classes.subtitleText)}
              >
                For the avoidance of doubt, the Contractor shall not be entitled
                to sell, derive any commercial benefit or otherwise provide the
                benefit of Documents, assessments or other information and/or
                deliverables provided by Alcumus to the Contractor or via the
                Systems to any third party.
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={10} className={clsx(classes.contentContainer)}>
            <Typography className={classes.subtitleText}>11.10</Typography>
            <Grid>
              <Typography
                className={clsx(classes.subText, classes.subtitleText)}
              >
                In the event that there is an actual, alleged or threatened
                breach of any third party’s intellectual property rights arising
                out of the Contractor’s use of the Systems, Alcumus may procure
                the right for the Contractor to continue using the Systems,
                replace or modify the Systems so that they become non-infringing
                or, if such remedies are not reasonably available, withdraw the
                Contractor’s access to the Systems without any additional
                liability or obligation to pay liquidated damages or other
                additional costs to the Contractor.
              </Typography>
            </Grid>
          </Grid>

          <Grid item xs={10} className={clsx(classes.infoContainer)}>
            <Typography className={classes.infotitle}>12.</Typography>
            <Typography className={clsx(classes.subText, classes.infotitle)}>
              LIMITATION OF LIABILITY AND REMEDIES
            </Typography>
          </Grid>
          <Grid item xs={10} className={clsx(classes.contentContainer)}>
            <Typography className={classes.subtitleText}>12.1</Typography>
            <Grid>
              <Typography
                className={clsx(classes.subText, classes.subtitleText)}
              >
                <b>
                  <u>
                    Subject to clause 12.3 and notwithstanding clause 12.2,
                    Alcumus’ maximum total liability under or arising out of or
                    in connection with the Contract shall not exceed the sum
                    which is twice the total value of the Charges paid by the
                    Contractor in the year during which the claim arose or such
                    pro-rated amount should the claim arise in the first year of
                    trading.
                  </u>
                </b>
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={10} className={clsx(classes.contentContainer)}>
            <Typography className={classes.subtitleText}>12.2</Typography>
            <Grid>
              <Typography
                className={clsx(classes.subText, classes.subtitleText)}
              >
                <b>
                  <u>
                    Subject to clause 12.3, neither party shall in any
                    circumstances have any liability (whether direct or
                    indirect) for: (i) loss of business or business opportunity;
                    (ii) loss of revenue; (iii) loss of profits; (iv) loss of
                    anticipated savings; (v) loss of or damage to data; (vi)
                    loss of goodwill or injury to reputation; (vii) any third
                    party claims (excluding any IP claims); (viii) loss which
                    could have been avoided by the Contractor through reasonable
                    conduct or by the Contractor taking reasonable precautions;
                    (ix) loss due to the Systems’ downtime for maintenance or in
                    the case of emergencies; (x) any consequential or indirect
                    loss; or (xi) in the case of Alcumus, any loss arising as a
                    result of any breach by the Contractor of the warranties in
                    clause 5.15. The Contractor is strongly advised to insure
                    against all such potential loss, damage, expense or
                    liability.
                  </u>
                </b>
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={10} className={clsx(classes.contentContainer)}>
            <Typography className={classes.subtitleText}>12.3</Typography>
            <Grid>
              <Typography
                className={clsx(classes.subText, classes.subtitleText)}
              >
                Nothing in the Contract seeks to exclude or limit any liability
                of either party for death or personal injury caused by its
                negligence or for its fraudulent misrepresentation.
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={10} className={clsx(classes.contentContainer)}>
            <Typography className={classes.subtitleText}>12.4</Typography>
            <Grid>
              <Typography
                className={clsx(classes.subText, classes.subtitleText)}
              >
                The Contractor hereby acknowledges and agrees that the
                limitations of liability referred to in clause 12.1 and 12.2 are
                fair and reasonable, reflected in the level of the Charges and
                the insurance cover carried by Alcumus, and are just and
                equitable having full regards to the extent of Alcumus’
                responsibility for any loss or damage suffered.
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={10} className={clsx(classes.contentContainer)}>
            <Typography className={classes.subtitleText}>12.5</Typography>
            <Grid>
              <Typography
                className={clsx(classes.subText, classes.subtitleText)}
              >
                Save as required by law and save as may otherwise be set out in
                the Contract, Alcumus disclaims and the Contractor waives all
                other warranties, express or implied, with respect to the
                Services, arising by law or otherwise, including, without
                limitation, any implied warranty of satisfactory quality,
                fitness for a particular purpose and any obligation, liability,
                right, remedy or claim in tort.
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={10} className={clsx(classes.contentContainer)}>
            <Typography className={classes.subtitleText}>12.6</Typography>
            <Grid>
              <Typography
                className={clsx(classes.subText, classes.subtitleText)}
              >
                Save as required by law, the Contractor’s exclusive remedy for
                any default or defect in the performance of the Services by
                Alcumus shall be to correct and/or re-perform any such defective
                Services by Alcumus. If it is not economical or technically
                feasible for Alcumus to correct and/or re-perform the defect,
                then the Contractor’s exclusive remedy shall be a full or
                partial credit of sums paid for the defective Service(s)
                (subject always to the other provisions of this clause 12).
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={10} className={clsx(classes.infoContainer)}>
            <Typography className={classes.infotitle}>13.</Typography>
            <Typography className={clsx(classes.subText, classes.infotitle)}>
              CONFIDENTIAL INFORMATION
            </Typography>
          </Grid>
          <Grid item xs={10} className={clsx(classes.contentContainer)}>
            <Typography className={classes.subtitleText}>13.1</Typography>
            <Grid>
              <Typography
                className={clsx(classes.subText, classes.subtitleText)}
              >
                Each party shall keep in strict confidence and treat the other
                party’s Confidential Information as confidential and to use it
                only for the purposes of the Contract (including for the
                avoidance of doubt for Alcumus to share all or part of such
                Confidential Information with the third parties set out in
                clause 10.7 and/or with any Client). The obligations of
                confidentiality in this clause 13.1shall not apply where: (i)
                such information is generally available to the pu3blic; or (ii)
                to the extent that disclosure of information is required to be
                made by law. For the avoidance of doubt, where the recipient of
                the Confidential Information under this Contract is required by
                law to release such Confidential Information to a third party,
                the recipient shall, unless prohibited by law, notify the
                discloser of any of its Confidential Information that is being
                released.
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={10} className={clsx(classes.contentContainer)}>
            <Typography className={classes.subtitleText}>13.2</Typography>
            <Grid>
              <Typography
                className={clsx(classes.subText, classes.subtitleText)}
              >
                Each party agrees that this obligation shall continue in force
                without limitation in point of time notwithstanding the
                termination or expiry of the Contract for any reason but shall
                cease to apply to information from the point at which it enters
                into the public domain by means other than a breach of clause
                13.1 and shall also cease to apply to information which is
                received independently from another source without the
                imposition of any duty of confidence.
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={10} className={clsx(classes.infoContainer)}>
            <Typography className={classes.infotitle}>14.</Typography>
            <Typography className={clsx(classes.subText, classes.infotitle)}>
              FORCE MAJEURE
            </Typography>
          </Grid>
          <Grid item xs={10} className={clsx(classes.contentContainer)}>
            <Typography className={classes.subtitleText}></Typography>
            <Grid>
              <Typography
                className={clsx(classes.subText, classes.subtitleText)}
              >
                Neither party shall have any liability to the other party if it
                is prevented from, or delayed in performing, its obligations
                under the Contract, or from carrying on its business by any
                event(s) or combination of events where such event(s) arises
                from, or is attributable to acts, events, omissions or accidents
                beyond the reasonable control of the relevant party including,
                but not limited to, acts of God, terrorism, war or flood (“Force
                Majeure Event”). In such circumstances the time for performance
                shall be extended by a period equivalent to the period during
                which performance of the obligation has been delayed or failed
                to be performed due to the Force Majeure Event.
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={10} className={clsx(classes.infoContainer)}>
            <Typography className={classes.infotitle}>15.</Typography>
            <Typography className={clsx(classes.subText, classes.infotitle)}>
              DURATION AND TERMINATION
            </Typography>
          </Grid>
          <Grid item xs={10} className={clsx(classes.contentContainer)}>
            <Typography className={classes.subtitleText}>15.1</Typography>
            <Grid>
              <Typography
                className={clsx(classes.subText, classes.subtitleText)}
              >
                The Contract shall commence on the Membership Registration Date
                and remain in force for the Initial Term unless terminated early
                in accordance with these Conditions. Unless terminated in
                accordance with this clause 15, the Contract shall automatically
                roll forward on expiry of the Initial Term for further
                Additional Term(s)
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={10} className={clsx(classes.contentContainer)}>
            <Typography className={classes.subtitleText}>15.2</Typography>
            <Grid>
              <Typography
                className={clsx(classes.subText, classes.subtitleText)}
              >
                Alcumus may terminate the Contract (or part thereof) at any time
                by providing the Contractor with 30 days’ written notice.
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={10} className={clsx(classes.contentContainer)}>
            <Typography className={classes.subtitleText}>15.3</Typography>
            <Grid>
              <Typography
                className={clsx(classes.subText, classes.subtitleText)}
              >
                The Contractor shall be entitled to terminate the Contract (or
                part thereof) without cause by providing 14 days’ written notice
                to Alcumus, such notice to expire no earlier than the date of
                expiry of the Initial Term or the then current Additional Term.
                For the avoidance of doubt, the Contractor shall not be entitled
                to reimbursement of any Charges paid in advance where the
                Contract is terminated in accordance with this clause 15, and
                all Charges paid are non- refundable (save as set out in clause
                12.6).
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={10} className={clsx(classes.contentContainer)}>
            <Typography className={classes.subtitleText}>15.4</Typography>
            <Grid>
              <Typography
                className={clsx(classes.subText, classes.subtitleText)}
              >
                Either party may terminate the Contract forthwith by notice to
                the other party without liability to such party if:
                <Grid
                  item
                  xs={10}
                  className={clsx(classes.subcontentContainer)}
                >
                  <Typography className={classes.subtitleText}>
                    15.4.1
                  </Typography>

                  <Typography
                    className={clsx(classes.subText, classes.subtitleText)}
                  >
                    the other party is in material breach of the Contract which
                    breach is not capable of remedy or, if capable of remedy, is
                    not remedied within 14 days of notification of the breach
                    and requiring its remedy; or
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={10}
                  className={clsx(classes.subcontentContainer)}
                >
                  <Typography className={classes.subtitleText}>
                    15.4.2
                  </Typography>

                  <Typography
                    className={clsx(classes.subText, classes.subtitleText)}
                  >
                    the other party has had a trustee, receiver, administrative
                    receiver or similar official appointed over a material part
                    of its business or assets; or an order has been made or a
                    resolution passed for the other party’s winding up
                    (otherwise than for the purpose of a bona fide scheme of
                    arrangement or solvent amalgamation or reconstruction) or an
                    administration order has been made; or a proposal has been
                    made in respect of the other party for a voluntary
                    arrangement within Part 1 of the Insolvency Act 1986 or for
                    any other composition scheme of arrangement with (or
                    assignment for the benefit of) its creditors; or the other
                    party ceases to trade or is unable to pay its debts as and
                    when they fall due; or any other analogous event occurs in
                    any other jurisdiction;
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={10}
                  className={clsx(classes.subcontentContainer)}
                >
                  <Typography className={classes.subtitleText}>
                    15.4.3
                  </Typography>

                  <Typography
                    className={clsx(classes.subText, classes.subtitleText)}
                  >
                    the other party ceases or threatens to cease trading; or
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={10}
                  className={clsx(classes.subcontentContainer)}
                >
                  <Typography className={classes.subtitleText}>
                    15.4.4
                  </Typography>

                  <Typography
                    className={clsx(classes.subText, classes.subtitleText)}
                  >
                    the other party fails to make any payment in accordance with
                    the terms of the Contract.
                  </Typography>
                </Grid>
              </Typography>
            </Grid>
          </Grid>

          <Grid item xs={10} className={clsx(classes.contentContainer)}>
            <Typography className={classes.subtitleText}>15.5</Typography>
            <Grid>
              <Typography
                className={clsx(classes.subText, classes.subtitleText)}
              >
                Alcumus may terminate the Contract immediately forthwith by
                notice to the Contractor without liability if the Contractor
                fails to comply with any of the obligations in clause 8.1.
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={10} className={clsx(classes.contentContainer)}>
            <Typography className={classes.subtitleText}>15.6</Typography>
            <Grid>
              <Typography
                className={clsx(classes.subText, classes.subtitleText)}
              >
                Upon termination of the Contract howsoever occurring:
                <Grid
                  item
                  xs={10}
                  className={clsx(classes.subcontentContainer)}
                >
                  <Typography className={classes.subtitleText}>
                    15.6.1
                  </Typography>

                  <Typography
                    className={clsx(classes.subText, classes.subtitleText)}
                  >
                    the Contractor&apos;s right to access and/or use the Systems
                    shall cease immediately;
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={10}
                  className={clsx(classes.subcontentContainer)}
                >
                  <Typography className={classes.subtitleText}>
                    15.6.2
                  </Typography>

                  <Typography
                    className={clsx(classes.subText, classes.subtitleText)}
                  >
                    the Contractor’s right to use the Accreditation Logo, if
                    existing at the date of termination, shall cease
                    immediately;
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={10}
                  className={clsx(classes.subcontentContainer)}
                >
                  <Typography className={classes.subtitleText}>
                    15.6.3
                  </Typography>

                  <Typography
                    className={clsx(classes.subText, classes.subtitleText)}
                  >
                    the Contractor shall return or dispose any of Alcumus&apos;
                    Confidential Information and all copies thereof in
                    accordance with Alcumus&apos; instructions;
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={10}
                  className={clsx(classes.subcontentContainer)}
                >
                  <Typography className={classes.subtitleText}>
                    15.6.4
                  </Typography>

                  <Typography
                    className={clsx(classes.subText, classes.subtitleText)}
                  >
                    the Contractor shall return to Alcumus the Accreditation
                    Logo; and
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={10}
                  className={clsx(classes.subcontentContainer)}
                >
                  <Typography className={classes.subtitleText}>
                    15.6.5
                  </Typography>

                  <Typography
                    className={clsx(classes.subText, classes.subtitleText)}
                  >
                    the Contractor shall remain liable to pay Alcumus any
                    Charges outstanding and for any Services already performed
                    prior to the date of termination.
                  </Typography>
                </Grid>
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={10} className={clsx(classes.contentContainer)}>
            <Typography className={classes.subtitleText}>15.7</Typography>
            <Grid>
              <Typography
                className={clsx(classes.subText, classes.subtitleText)}
              >
                Following termination of the Contract, the Contractor may still
                appear on the Client Portal and/or the Master List and/or any
                Approved List, but shall be shown as having ‘cancelled status’.
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={10} className={clsx(classes.contentContainer)}>
            <Typography className={classes.subtitleText}>15.8</Typography>
            <Grid>
              <Typography
                className={clsx(classes.subText, classes.subtitleText)}
              >
                Termination of the Contract for any reason shall be without
                prejudice to any rights of either party which may have accrued
                up to the date of termination.
              </Typography>
            </Grid>
          </Grid>

          <Grid item xs={10} className={clsx(classes.contentContainer)}>
            <Typography className={classes.subtitleText}>15.9</Typography>
            <Grid>
              <Typography
                className={clsx(classes.subText, classes.subtitleText)}
              >
                Clauses 9, 10.2, 11, 12, 13, 15.6, 15.7, 15.8, 15.9 and 16 shall
                survive termination.
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={10} className={clsx(classes.infoContainer)}>
            <Typography className={classes.infotitle}>16.</Typography>
            <Typography className={clsx(classes.subText, classes.infotitle)}>
              MISCELLANEOUS
            </Typography>
          </Grid>
          <Grid item xs={10} className={clsx(classes.contentContainer)}>
            <Typography className={classes.subtitleText}>16.1</Typography>
            <Grid>
              <Typography
                className={clsx(classes.subText, classes.subtitleText)}
              >
                The Contract contains the entire understanding between the
                parties in connection with the matters herein contained and
                supersedes any previous agreements statements or undertakings
                (whether written, oral or implied) relating to the subject
                matter of the Contract. The parties acknowledge that in entering
                into the Contract neither has relied on any oral or written
                representation or undertaking by the other except as expressly
                incorporated in the Contract. Nothing in this clause 16.1 shall
                exclude any liability in respect of misrepresentations made
                fraudulently.
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={10} className={clsx(classes.contentContainer)}>
            <Typography className={classes.subtitleText}>16.2</Typography>
            <Grid>
              <Typography
                className={clsx(classes.subText, classes.subtitleText)}
              >
                A waiver by either party of any right under the Contract, or of
                any failure to perform or breach hereof by either party, shall
                not constitute or be deemed to be a waiver of any other or
                future right hereunder or of any other failure to perform or
                breach hereof, whether of a similar or dissimilar nature.
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={10} className={clsx(classes.contentContainer)}>
            <Typography className={classes.subtitleText}>16.3</Typography>
            <Grid>
              <Typography
                className={clsx(classes.subText, classes.subtitleText)}
              >
                Alcumus may vary these Conditions from time to time on giving
                the Contractor at least 30 days&apos; notice in writing.
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={10} className={clsx(classes.contentContainer)}>
            <Typography className={classes.subtitleText}>16.4</Typography>
            <Grid>
              <Typography
                className={clsx(classes.subText, classes.subtitleText)}
              >
                For the purposes of the Contract, Alcumus shall be an
                independent contractor, and neither Alcumus nor its
                sub-contractors nor its directors or employees nor any one of
                them, shall be deemed to be an employee or agent of or a partner
                with the Contractor.
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={10} className={clsx(classes.contentContainer)}>
            <Typography className={classes.subtitleText}>16.5</Typography>
            <Grid>
              <Typography
                className={clsx(classes.subText, classes.subtitleText)}
              >
                The Contractor shall not assign the Contract in whole or in part
                without the prior approval of Alcumus (such approval not to be
                unreasonably withheld or delayed). Alcumus shall be entitled to
                assign the Contract in whole or in part at any time without
                consent.
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={10} className={clsx(classes.contentContainer)}>
            <Typography className={classes.subtitleText}>16.6</Typography>
            <Grid>
              <Typography
                className={clsx(classes.subText, classes.subtitleText)}
              >
                A person who is not a party to the Contract shall not have any
                rights under or in connection with it.
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={10} className={clsx(classes.contentContainer)}>
            <Typography className={classes.subtitleText}>16.7</Typography>
            <Grid>
              <Typography
                className={clsx(classes.subText, classes.subtitleText)}
              >
                Both parties shall comply, and shall ensure that each of their
                subcontractors, agents and personnel comply, with any relevant
                and applicable anti-bribery and corruption laws, regulations
                and/or directives related to the provision and receipt of the
                Services.
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={10} className={clsx(classes.contentContainer)}>
            <Typography className={classes.subtitleText}>16.8</Typography>
            <Grid>
              <Typography
                className={clsx(classes.subText, classes.subtitleText)}
              >
                The Contractor warrants and represents to Alcumus that it
                complies with the Bribery Act 2010 and that it has not and shall
                not, in connection with the Services contemplated by the
                Contract or in connection with any other business transactions
                involving Alcumus, make, promise or offer to make any payment or
                transfer of anything of value, directly or indirectly: (i) to
                any government official (as defined below) or to an intermediary
                for payment to any government official, or (ii) to any political
                party for the purpose of influencing any act or decision of such
                official or securing an improper advantage to assist Alcumus in
                obtaining or retaining business. It is the intent of the parties
                that no payments or transfers of value shall be made which have
                the purpose or effect of public or commercial bribery,
                acceptance of or acquiescence in extortion, kickbacks or other
                unlawful or improper means of obtaining business. “Government
                official” is defined as any employee or officer of a government
                of a country, including any regional or local department,
                company or business owned or controlled by such government, any
                official of a political party, any official or employee of a
                public international organisation, any person acting in an
                official capacity for, or on behalf of, such entities, and any
                candidate for political office. Failure by the Contractor to
                comply with this clause shall constitute a material breach of
                the Contract.
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={10} className={clsx(classes.contentContainer)}>
            <Typography className={classes.subtitleText}>16.9</Typography>
            <Grid>
              <Typography
                className={clsx(classes.subText, classes.subtitleText)}
              >
                The Contractor agrees that it shall not at any time during the
                Term or for 6 months thereafter, without the prior written
                consent of Alcumus, directly or indirectly solicit, induce or
                entice away from Alcumus or employ, engage or appoint in any way
                cause to be employed, engaged or appointed any employee, agent
                or sub-contractor of Alcumus to perform services substantially
                similar to the Services.
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={10} className={clsx(classes.contentContainer)}>
            <Typography className={classes.subtitleText}>16.10</Typography>
            <Grid>
              <Typography
                className={clsx(classes.subText, classes.subtitleText)}
              >
                Any notice under the Contract must be given in writing to the
                addresses specified by the parties from time to time, and if no
                address is given, the registered office of such party. Any such
                notices shall be effective if delivered by recorded delivery
                (delivery deemed to have taken place at the date and time
                recorded).
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={10} className={clsx(classes.contentContainer)}>
            <Typography className={classes.subtitleText}>16.11</Typography>
            <Grid>
              <Typography
                className={clsx(classes.subText, classes.subtitleText)}
              >
                Each provision of the Contract is severable and distinct from
                the others and if any provision is or at any time becomes to any
                extent or in any circumstances invalid, illegal or unenforceable
                for any reason, it shall to that extent or in those
                circumstances be deemed not to form part of the Contract, but
                the validity, legality and enforceability of all other provision
                of the Contract shall not otherwise be affected or impaired, it
                being the parties intention that every provision of the Contract
                shall be and remain valid and enforceable to the fullest extent
                permitted by law.
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={10} className={clsx(classes.contentContainer)}>
            <Typography className={classes.subtitleText}>16.12</Typography>
            <Grid>
              <Typography
                className={clsx(classes.subText, classes.subtitleText)}
              >
                In performing its obligations under the Contract, each party
                shall procure (and shall procure that each member of its Group)
                complies with the terms of the Modern Slavery Act 2015.
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={10} className={clsx(classes.contentContainer)}>
            <Typography className={classes.subtitleText}>16.13</Typography>
            <Grid>
              <Typography
                className={clsx(classes.subText, classes.subtitleText)}
              >
                The Contract, including any non-contractual disputes or claims,
                shall be governed by and construed in accordance with the laws
                of England and Wales and the parties hereby submit to the
                exclusive jurisdiction of the English and Welsh courts.
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={10} className={clsx(classes.infoContainer)}>
            <Typography className={classes.infotitle}></Typography>
            <Typography className={clsx(classes.subText, classes.infotitle)}>
              APPENDIX 1 – SERVICES PACKAGE
            </Typography>
          </Grid>
          <Grid item xs={10} className={classes.tableContainer}>
            <table className={classes.borderCell}>
              <tr>
                <th className={classes.borderCell}>Package</th>
                <th className={classes.borderCell}>Service description</th>
              </tr>
              {termsServicePackageData.map((val, key) => {
                return (
                  <tr key={key}>
                    <td className={classes.borderCell}>
                      <b>{val.package}</b>
                    </td>
                    <td className={classes.borderCell}>{val.description}</td>
                  </tr>
                );
              })}
            </table>
          </Grid>
        </Grid>
      </Grid>
      <Grid container className={classes.footer}></Grid>
    </Page>
  );
}
