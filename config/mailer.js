const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

const sendMail = async ({ to, subject, html, text }) => {
  try {
    console.log("📤 Sending email to:", to);

    const data = await resend.emails.send({
      from: `${process.env.EMAIL_FROM_NAME} <${process.env.EMAIL_FROM}>`,
      to,
      subject,
      html: html || `<p>${text}</p>`,
      text,
    });

    console.log("✅ Resend success:", data);
    return data;
  } catch (error) {
    console.error("❌ Resend error:", error);
    throw new Error("Email sending failed");
  }
};

const sendWelcomeEmail = async (user) => {
  return sendMail({
    to: user.email,
    subject: `Welcome to Satinder Poetry ✨`,
    html: `
<!DOCTYPE html>
<html xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="en">

<head>
	<title></title>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0"><!--[if mso]>
<xml><w:WordDocument xmlns:w="urn:schemas-microsoft-com:office:word"><w:DontUseAdvancedTypographyReadingMail/></w:WordDocument>
<o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch><o:AllowPNG/></o:OfficeDocumentSettings></xml>
<![endif]--><!--[if !mso]><!--><!--<![endif]-->
	<style>
		* {
			box-sizing: border-box;
		}

		body {
			margin: 0;
			padding: 0;
		}

		a[x-apple-data-detectors] {
			color: inherit !important;
			text-decoration: inherit !important;
		}

		#MessageViewBody a {
			color: inherit;
			text-decoration: none;
		}

		p {
			line-height: inherit
		}

		.desktop_hide,
		.desktop_hide table {
			mso-hide: all;
			display: none;
			max-height: 0px;
			overflow: hidden;
		}

		.image_block img+div {
			display: none;
		}

		sup,
		sub {
			font-size: 75%;
			line-height: 0;
		}

		@media (max-width: 670px) {
			.desktop_hide table.icons-outer {
				display: inline-table !important;
			}

			.icons-inner {
				text-align: center;
			}

			.icons-inner td {
				margin: 0 auto;
			}

			.image_block div.fullWidth {
				max-width: 100% !important;
			}

			.row-content {
				width: 100% !important;
			}

			.stack .column {
				width: 100%;
				display: block;
			}

			.mobile_hide {
				min-height: 0;
				max-height: 0;
				max-width: 0;
				display: none;
				overflow: hidden;
				font-size: 0;
			}

			.desktop_hide,
			.desktop_hide table {
				display: table !important;
				max-height: none !important;
			}

			.row-3 .column-1 .block-1.spacer_block {
				height: 50px !important;
			}

			.row-3 .column-1 .block-2.divider_block td.pad {
				padding: 0 25px !important;
			}

			.row-3 .column-1 .block-2.divider_block td.pad table {
				display: inline-table;
			}

			.row-3 .column-1 .block-3.paragraph_block td.pad {
				padding: 10px 25px 0 25px !important;
			}

			.row-3 .column-1 .block-6.spacer_block {
				height: 10px !important;
			}

			.row-3 .column-1 .block-12.button_block td.pad .button {
				width: 50% !important;
			}

			.row-4 .column-1 .block-2.paragraph_block td.pad {
				padding: 0 5px 0 0 !important;
			}

			.row-5 .column-1 .block-1.paragraph_block td.pad {
				padding: 10px 25px !important;
			}

			.row-4 .column-3 .block-2.paragraph_block td.pad {
				padding: 0 0 0 5px !important;
			}

			.row-11 .column-2 .block-1.image_block td.pad {
				padding: 0 !important;
			}

			.row-10 .column-1 {
				padding: 20px !important;
			}

			.row-10 .column-2 .col-pad {
				padding: 30px !important;
			}

			.row-11 .column-1 .col-pad {
				padding: 30px 30px 20px 30px !important;
			}

			.row-11 .column-2 .col-pad {
				padding: 5px 30px 30px 30px !important;
			}

			.desktop_hide table.icons-inner,
			.social_block .social-table {
				display: inline-block !important;
			}

			.row-1 .column-1 .block-1.image_block td.pad div,
			.row-11 .column-2 .block-1.image_block td.pad div {
				margin: 0 auto !important;
			}

			.row-3 .column-1 .block-4.spacer_block,
			.row-9 .column-1 .block-1.spacer_block {
				height: 30px !important;
			}

			.row-3 .column-1 .block-7.paragraph_block td.pad>div,
			.row-3 .column-1 .block-8.paragraph_block td.pad>div {
				font-size: 36px !important;
			}

			.row-3 .column-1 .block-10.paragraph_block td.pad>div,
			.row-5 .column-1 .block-1.paragraph_block td.pad>div,
			.row-6 .column-1 .block-3.paragraph_block td.pad>div,
			.row-7 .column-1 .block-3.paragraph_block td.pad>div,
			.row-8 .column-1 .block-3.paragraph_block td.pad>div {
				font-size: 14px !important;
			}

			.row-3 .column-1 .block-13.spacer_block,
			.row-4 .column-1 .block-1.spacer_block,
			.row-4 .column-2 .block-1.spacer_block,
			.row-4 .column-3 .block-1.spacer_block {
				height: 20px !important;
			}

			.row-3 .column-1 .block-12.button_block span,
			.row-10 .column-2 .block-4.button_block span,
			.row-11 .column-1 .block-4.button_block span {
				line-height: 28px !important;
			}

			.row-4 .column-1 .block-2.paragraph_block td.pad>div,
			.row-4 .column-2 .block-2.paragraph_block td.pad>div,
			.row-4 .column-3 .block-2.paragraph_block td.pad>div {
				font-size: 20px !important;
			}

			.row-6 .column-1 .block-1.heading_block h1,
			.row-6 .column-1 .block-2.paragraph_block td.pad>div,
			.row-7 .column-1 .block-1.heading_block h1,
			.row-7 .column-1 .block-2.paragraph_block td.pad>div,
			.row-8 .column-1 .block-1.heading_block h1,
			.row-8 .column-1 .block-2.paragraph_block td.pad>div {
				font-size: 16px !important;
			}

			.row-6 .column-1 .block-2.paragraph_block td.pad,
			.row-7 .column-1 .block-2.paragraph_block td.pad,
			.row-8 .column-1 .block-2.paragraph_block td.pad {
				padding: 5px 0 !important;
			}

			.row-6 .column-1 .block-3.paragraph_block td.pad,
			.row-7 .column-1 .block-3.paragraph_block td.pad,
			.row-8 .column-1 .block-3.paragraph_block td.pad {
				padding: 5px 25px 10px 25px !important;
			}

			.row-10 .column-2 .block-2.paragraph_block td.pad>div,
			.row-10 .column-2 .block-1.paragraph_block td.pad>div,
			.row-11 .column-1 .block-1.paragraph_block td.pad>div,
			.row-11 .column-1 .block-2.paragraph_block td.pad>div {
				text-align: center !important;
				font-size: 30px !important;
			}

			.row-10 .column-2 .block-3.paragraph_block td.pad>div,
			.row-11 .column-1 .block-3.paragraph_block td.pad>div {
				text-align: center !important;
				font-size: 14px !important;
			}

			.row-10 .column-2 .block-3.paragraph_block td.pad,
			.row-11 .column-1 .block-3.paragraph_block td.pad {
				padding: 10px 0 !important;
			}

			.row-10 .column-2 .block-4.button_block td.pad,
			.row-11 .column-1 .block-4.button_block td.pad {
				text-align: center !important;
				padding: 10px 0 0 0 !important;
			}

			.row-6 .column-1 .col-pad,
			.row-7 .column-1 .col-pad,
			.row-8 .column-1 .col-pad {
				padding: 30px 15px 25px 15px !important;
			}
		}
	</style><!--[if mso ]><style>sup, sub { font-size: 100% !important; } sup { mso-text-raise:10% } sub { mso-text-raise:-10% }</style> <![endif]--><!--[if true]><style>.forceBgColor{background-color: white !important}</style><![endif]-->
</head>

<body class="body forceBgColor" style="margin: 0; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none; background-color: transparent;">
	<table class="nl-container" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: transparent; background-image: none; background-position: top left; background-size: auto; background-repeat: no-repeat;">
		<tbody>
			<tr>
				<td>
					<table class="row row-1" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-size: auto;">
						<tbody>
							<tr>
								<td>
									<table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff; background-size: auto; color: #000000; width: 650px; margin: 0 auto;" width="650">
										<tbody>
											<tr>
												<td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top;">
													<table class="image_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
														<tr>
															<td class="pad" style="width:100%;" align="left">
																<div style="max-width: 650px;"><a href="https://satinderpoetry.com" target="_blank"><img src="https://228fe3e270.imgdist.com/pub/bfra/jp6v7hcl/vfu/uho/prq/Satinder%20Poetry%20-%20Logo.png" style="display: block; height: auto; border: 0; width: 100%;" width="650" alt="Logo" title="Logo" height="auto"></a></div>
															</td>
														</tr>
													</table>
												</td>
											</tr>
										</tbody>
									</table>
								</td>
							</tr>
						</tbody>
					</table>
					<table class="row row-2" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
						<tbody>
							<tr>
								<td>
									<table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #f6f5f1; border-radius: 0; color: #000000; width: 650px; margin: 0 auto;" width="650">
										<tbody>
											<tr>
												<td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top;">
													<table class="image_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
														<tr>
															<td class="pad" style="width:100%;" align="center">
																<div style="max-width: 650px;"><img src="https://d1oco4z2z1fhwp.cloudfront.net/templates/default/8741/BEE_May20_MarketingAgency_Invoice_v01.jpg" style="display: block; height: auto; border: 0; width: 100%;" width="650" alt="" title="" height="auto"></div>
															</td>
														</tr>
													</table>
												</td>
											</tr>
										</tbody>
									</table>
								</td>
							</tr>
						</tbody>
					</table>
					<table class="row row-3" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-size: auto;">
						<tbody>
							<tr>
								<td>
									<table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #007c86; background-image: url('https://d1oco4z2z1fhwp.cloudfront.net/templates/default/8741/BEE_May20_MarketingAgency_Onboarding_v01_copy.jpg'); background-repeat: no-repeat; background-size: cover; border-radius: 0; color: #000000; width: 650px; margin: 0 auto;" width="650">
										<tbody>
											<tr>
												<td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top;">
													<div class="spacer_block block-1" style="height:60px;line-height:60px;font-size:1px;">&#8202;</div>
													<table class="divider_block mobile_hide block-2" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
														<tr>
															<td class="pad" style="padding-left:60px;padding-right:60px;" align="center">
																<table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
																	<tr>
																		<td class="divider_inner" style="font-size: 1px; line-height: 1px; border-top: 1px solid #ffffff;"><span style="word-break: break-word;">&#8202;</span></td>
																	</tr>
																</table>
															</td>
														</tr>
													</table>
													<table class="paragraph_block mobile_hide block-3" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
														<tr>
															<td class="pad" style="padding-top:10px;padding-left:60px;padding-right:60px;">
																<div style="color:#ffffff;direction:ltr;font-family:'Helvetica Neue', Helvetica, Arial, sans-serif;font-size:14px;font-weight:400;letter-spacing:2px;line-height:1.2;text-align:left;mso-line-height-alt:17px;">
																	<p style="margin: 0;">SATINDER<br>POETRY</p>
																</div>
															</td>
														</tr>
													</table>
													<div class="spacer_block block-4 mobile_hide" style="height:80px;line-height:80px;font-size:1px;">&#8202;</div>
													<table class="image_block block-5" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
														<tr>
															<td class="pad" style="width:100%;" align="center">
																<div style="max-width: 65px;"><img src="https://d1oco4z2z1fhwp.cloudfront.net/templates/default/8741/3_Green_Sparkles.png" style="display: block; height: auto; border: 0; width: 100%;" width="65" alt="" title="" height="auto"></div>
															</td>
														</tr>
													</table>
													<div class="spacer_block block-6" style="height:20px;line-height:20px;font-size:1px;">&#8202;</div>
													<table class="paragraph_block block-7" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
														<tr>
															<td class="pad">
																<div style="color:#ffffff;font-family:'Helvetica Neue', Helvetica, Arial, sans-serif;font-size:60px;font-weight:700;letter-spacing:-1px;line-height:1.2;text-align:center;mso-line-height-alt:72px;">
																	<p style="margin: 0; word-break: break-word;">Welcome to</p>
																</div>
															</td>
														</tr>
													</table>
													<table class="paragraph_block block-8" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
														<tr>
															<td class="pad">
																<div style="color:#ffffff;font-family:TimesNewRoman, 'Times New Roman', Times, Beskerville, Georgia, serif;font-size:60px;font-weight:400;letter-spacing:-1px;line-height:1.2;text-align:center;mso-line-height-alt:72px;">
																	<p style="margin: 0; word-break: break-word;">Satinder Poetry</p>
																</div>
															</td>
														</tr>
													</table>
													<div class="spacer_block block-9" style="height:10px;line-height:10px;font-size:1px;">&#8202;</div>
													<table class="paragraph_block block-10" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
														<tr>
															<td class="pad" style="padding-top:10px;padding-left:60px;padding-right:60px;">
																<div style="color:#ffffff;direction:ltr;font-family:'Helvetica Neue', Helvetica, Arial, sans-serif;font-size:16px;font-weight:400;letter-spacing:0px;line-height:1.2;text-align:center;mso-line-height-alt:19px;">
																	<p style="margin: 0;">Poetry, stories, reflections, and emotional writing crafted with simplicity and meaning.</p>
																</div>
															</td>
														</tr>
													</table>
													<div class="spacer_block block-11" style="height:20px;line-height:20px;font-size:1px;">&#8202;</div>
													<table class="button_block block-12" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
														<tr>
															<td class="pad" align="center"><a href="https://satinderpoetry.com" target="_blank" style="color:#222222;text-decoration:none;"><!--[if mso]>
<v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word"  href="https://satinderpoetry.com"  style="height:37px;width:187px;v-text-anchor:middle;" arcsize="25%" fillcolor="#ddd988">
<v:stroke dashstyle="Solid" weight="1px" color="#222222"/>
<w:anchorlock/>
<v:textbox inset="0px,0px,0px,0px">
<center dir="false" style="color:#222222;font-family:Arial, sans-serif;font-size:14px">
<![endif]--><span class="button" style="background-color: #ddd988; border-bottom: 1px solid #222222; border-left: 1px solid #222222; border-radius: 10px; border-right: 1px solid #222222; border-top: 1px solid #222222; color: #222222; display: inline-block; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 400; mso-border-alt: none; text-align: center; width: 30%; word-break: keep-all; letter-spacing: 1px;"><span class="btn-pad" style="word-break: break-word; padding-left: 15px; padding-right: 15px; padding-top: 5px; padding-bottom: 5px; display: block;"><span style="word-break: break-word; line-height: 28px;">EXPLORE POEMS</span></span></span><!--[if mso]></center></v:textbox></v:roundrect><![endif]--></a></td>
														</tr>
													</table>
													<div class="spacer_block block-13" style="height:40px;line-height:40px;font-size:1px;">&#8202;</div>
													<table class="image_block block-14" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
														<tr>
															<td class="pad" style="width:100%;" align="center">
																<div class="fullWidth" style="max-width: 650px;"><img src="https://d1oco4z2z1fhwp.cloudfront.net/templates/default/8741/Welcome_Thread.png" style="display: block; height: auto; border: 0; width: 100%;" width="650" alt="" title="" height="auto"></div>
															</td>
														</tr>
													</table>
												</td>
											</tr>
										</tbody>
									</table>
								</td>
							</tr>
						</tbody>
					</table>
					<table class="row row-4" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
						<tbody>
							<tr>
								<td>
									<table class="row-content" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #f6f5f1; background-image: url('https://d1oco4z2z1fhwp.cloudfront.net/templates/default/8741/Orange_BG_Gradient.jpg'); background-repeat: no-repeat; border-radius: 0; color: #000000; width: 650px; margin: 0 auto;" width="650">
										<tbody>
											<tr>
												<td class="column column-1" width="41.666666666666664%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top;">
													<div class="spacer_block block-1" style="height:40px;line-height:40px;font-size:1px;">&#8202;</div>
													<table class="paragraph_block block-2" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
														<tr>
															<td class="pad" style="padding-right:10px;">
																<div style="color:#222222;font-family:TimesNewRoman, 'Times New Roman', Times, Beskerville, Georgia, serif;font-size:38px;font-weight:400;letter-spacing:-1px;line-height:1.2;text-align:right;mso-line-height-alt:46px;">
																	<p style="margin: 0; word-break: break-word;"><em>First</em></p>
																</div>
															</td>
														</tr>
													</table>
												</td>
												<td class="column column-2" width="16.666666666666668%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top;">
													<div class="spacer_block block-1" style="height:40px;line-height:40px;font-size:1px;">&#8202;</div>
													<table class="paragraph_block block-2" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
														<tr>
															<td class="pad">
																<div style="color:#222222;font-family:'Helvetica Neue', Helvetica, Arial, sans-serif;font-size:38px;font-weight:700;letter-spacing:-1px;line-height:1.2;text-align:center;mso-line-height-alt:46px;">
																	<p style="margin: 0; word-break: break-word;">things</p>
																</div>
															</td>
														</tr>
													</table>
												</td>
												<td class="column column-3" width="41.666666666666664%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top;">
													<div class="spacer_block block-1" style="height:40px;line-height:40px;font-size:1px;">&#8202;</div>
													<table class="paragraph_block block-2" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
														<tr>
															<td class="pad" style="padding-left:10px;">
																<div style="color:#222222;font-family:TimesNewRoman, 'Times New Roman', Times, Beskerville, Georgia, serif;font-size:38px;font-weight:400;letter-spacing:-1px;line-height:1.2;text-align:left;mso-line-height-alt:46px;">
																	<p style="margin: 0; word-break: break-word;"><em>first</em></p>
																</div>
															</td>
														</tr>
													</table>
												</td>
											</tr>
										</tbody>
									</table>
								</td>
							</tr>
						</tbody>
					</table>
					<table class="row row-5" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
						<tbody>
							<tr>
								<td>
									<table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #f6f5f1; background-image: url('https://d1oco4z2z1fhwp.cloudfront.net/templates/default/8741/Orange_BG_Gradient.jpg'); background-repeat: no-repeat; border-radius: 0; color: #000000; width: 650px; margin: 0 auto;" width="650">
										<tbody>
											<tr>
												<td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top;">
													<table class="paragraph_block block-1" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
														<tr>
															<td class="pad">
																<div style="color:#222222;direction:ltr;font-family:'Helvetica Neue', Helvetica, Arial, sans-serif;font-size:16px;font-weight:400;letter-spacing:0px;line-height:1.2;text-align:center;mso-line-height-alt:19px;">
																	<p style="margin: 0;">Let's get you up and running.<br>It's as simple as 1, 2, 3.</p>
																</div>
															</td>
														</tr>
													</table>
													<div class="spacer_block block-2 mobile_hide" style="height:15px;line-height:15px;font-size:1px;">&#8202;</div>
												</td>
											</tr>
										</tbody>
									</table>
								</td>
							</tr>
						</tbody>
					</table>
					<table class="row row-6" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-image: url('https://d1oco4z2z1fhwp.cloudfront.net/templates/default/8741/BEE_May20_MarketingAgency_Onboarding_v02_copy.jpg'); background-position: top center; background-repeat: no-repeat; background-size: auto;">
						<tbody>
							<tr>
								<td>
									<table class="row-content" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-size: auto; border-bottom: 15px solid transparent; border-left: 30px solid transparent; border-radius: 0; border-right: 30px solid transparent; border-top: 15px solid transparent; color: #000000; width: 650px; margin: 0 auto;" width="650">
										<tbody>
											<tr>
												<td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; background-color: #ffffff; vertical-align: top;">
													<table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
														<tr>
															<td class="col-pad" style="padding-bottom:25px;padding-left:25px;padding-right:25px;padding-top:30px;">
																<table class="heading_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
																	<tr>
																		<td class="pad" style="width:100%;padding-bottom:5px;" align="center">
																			<h1 style="margin: 0; color: #222222; direction: ltr; font-family: TimesNewRoman, 'Times New Roman', Times, Beskerville, Georgia, serif; font-size: 22px; font-weight: 400; letter-spacing: -1px; line-height: 1.2; text-align: center; margin-top: 0; margin-bottom: 0; mso-line-height-alt: 26px;">Poetry</h1>
																		</td>
																	</tr>
																</table>
																<table class="paragraph_block block-2" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
																	<tr>
																		<td class="pad">
																			<div style="color:#222222;direction:ltr;font-family:'Helvetica Neue', Helvetica, Arial, sans-serif;font-size:30px;font-weight:700;letter-spacing:0px;line-height:1.2;text-align:center;mso-line-height-alt:36px;">
																				<p style="margin: 0;">Read emotional poems</p>
																			</div>
																		</td>
																	</tr>
																</table>
																<table class="paragraph_block block-3" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
																	<tr>
																		<td class="pad">
																			<div style="color:#222222;direction:ltr;font-family:'Helvetica Neue', Helvetica, Arial, sans-serif;font-size:14px;font-weight:400;letter-spacing:0px;line-height:1.2;text-align:center;mso-line-height-alt:17px;">
																				<p style="margin: 0;">Explore poetry filled with love, silence, heartbreak, memories, and reflection.</p>
																			</div>
																		</td>
																	</tr>
																</table>
																<table class="button_block block-4" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
																	<tr>
																		<td class="pad" align="center"><a href="https://satinderpoetry.com/poems" target="_blank" style="color:#222222;text-decoration:none;"><!--[if mso]>
<v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word"  href="https://satinderpoetry.com/poems"  style="height:37px;width:132px;v-text-anchor:middle;" arcsize="25%" fillcolor="#f7a12d">
<v:stroke dashstyle="Solid" weight="1px" color="#222222"/>
<w:anchorlock/>
<v:textbox inset="0px,0px,0px,0px">
<center dir="false" style="color:#222222;font-family:Arial, sans-serif;font-size:14px">
<![endif]--><span class="button" style="background-color: #f7a12d; border-bottom: 1px solid #222222; border-left: 1px solid #222222; border-radius: 10px; border-right: 1px solid #222222; border-top: 1px solid #222222; color: #222222; display: inline-block; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 400; mso-border-alt: none; text-align: center; width: auto; word-break: keep-all; letter-spacing: 1px;"><span class="btn-pad" style="word-break: break-word; padding-left: 15px; padding-right: 15px; padding-top: 5px; padding-bottom: 5px; display: block;"><span style="word-break: break-word; line-height: 28px;">READ POEMS</span></span></span><!--[if mso]></center></v:textbox></v:roundrect><![endif]--></a></td>
																	</tr>
																</table>
															</td>
														</tr>
													</table>
												</td>
											</tr>
										</tbody>
									</table>
								</td>
							</tr>
						</tbody>
					</table>
					<table class="row row-7" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-image: url('https://d1oco4z2z1fhwp.cloudfront.net/templates/default/8741/BEE_May20_MarketingAgency_Onboarding_v03_copy.jpg'); background-position: top center; background-repeat: no-repeat; background-size: auto;">
						<tbody>
							<tr>
								<td>
									<table class="row-content" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-size: auto; border-bottom: 15px solid transparent; border-left: 30px solid transparent; border-radius: 0; border-right: 30px solid transparent; border-top: 15px solid transparent; color: #000000; width: 650px; margin: 0 auto;" width="650">
										<tbody>
											<tr>
												<td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; background-color: #ffffff; vertical-align: top;">
													<table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
														<tr>
															<td class="col-pad" style="padding-bottom:25px;padding-left:25px;padding-right:25px;padding-top:30px;">
																<table class="heading_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
																	<tr>
																		<td class="pad" style="width:100%;padding-bottom:5px;" align="center">
																			<h1 style="margin: 0; color: #222222; direction: ltr; font-family: TimesNewRoman, 'Times New Roman', Times, Beskerville, Georgia, serif; font-size: 22px; font-weight: 400; letter-spacing: -1px; line-height: 1.2; text-align: center; margin-top: 0; margin-bottom: 0; mso-line-height-alt: 26px;">Stories</h1>
																		</td>
																	</tr>
																</table>
																<table class="paragraph_block block-2" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
																	<tr>
																		<td class="pad">
																			<div style="color:#222222;direction:ltr;font-family:'Helvetica Neue', Helvetica, Arial, sans-serif;font-size:30px;font-weight:700;letter-spacing:0px;line-height:1.2;text-align:center;mso-line-height-alt:36px;">
																				<p style="margin: 0;">Dive into reflections</p>
																			</div>
																		</td>
																	</tr>
																</table>
																<table class="paragraph_block block-3" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
																	<tr>
																		<td class="pad">
																			<div style="color:#222222;direction:ltr;font-family:'Helvetica Neue', Helvetica, Arial, sans-serif;font-size:16px;font-weight:400;letter-spacing:0px;line-height:1.2;text-align:center;mso-line-height-alt:19px;">
																				<p style="margin: 0;">Read emotional stories, thoughts, and meaningful writing beyond poetry.</p>
																			</div>
																		</td>
																	</tr>
																</table>
																<table class="button_block block-4" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
																	<tr>
																		<td class="pad" align="center"><a href="https://satinderpoetry.com" target="_blank" style="color:#222222;text-decoration:none;"><!--[if mso]>
<v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word"  href="https://satinderpoetry.com"  style="height:37px;width:175px;v-text-anchor:middle;" arcsize="25%" fillcolor="#eddab2">
<v:stroke dashstyle="Solid" weight="1px" color="#222222"/>
<w:anchorlock/>
<v:textbox inset="0px,0px,0px,0px">
<center dir="false" style="color:#222222;font-family:Arial, sans-serif;font-size:14px">
<![endif]--><span class="button" style="background-color: #eddab2; border-bottom: 1px solid #222222; border-left: 1px solid #222222; border-radius: 10px; border-right: 1px solid #222222; border-top: 1px solid #222222; color: #222222; display: inline-block; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 400; mso-border-alt: none; text-align: center; width: auto; word-break: keep-all; letter-spacing: 1px;"><span class="btn-pad" style="word-break: break-word; padding-left: 15px; padding-right: 15px; padding-top: 5px; padding-bottom: 5px; display: block;"><span style="word-break: break-word; line-height: 28px;">EXPLORE STORIES</span></span></span><!--[if mso]></center></v:textbox></v:roundrect><![endif]--></a></td>
																	</tr>
																</table>
															</td>
														</tr>
													</table>
												</td>
											</tr>
										</tbody>
									</table>
								</td>
							</tr>
						</tbody>
					</table>
					<table class="row row-8" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-image: url('https://d1oco4z2z1fhwp.cloudfront.net/templates/default/8741/BEE_May20_MarketingAgency_Onboarding_v04_copy.jpg'); background-position: top center; background-repeat: no-repeat; background-size: auto;">
						<tbody>
							<tr>
								<td>
									<table class="row-content" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-size: auto; border-bottom: 15px solid transparent; border-left: 30px solid transparent; border-radius: 0; border-right: 30px solid transparent; border-top: 15px solid transparent; color: #000000; width: 650px; margin: 0 auto;" width="650">
										<tbody>
											<tr>
												<td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; background-color: #ffffff; vertical-align: top;">
													<table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
														<tr>
															<td class="col-pad" style="padding-bottom:25px;padding-left:25px;padding-right:25px;padding-top:30px;">
																<table class="heading_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
																	<tr>
																		<td class="pad" style="width:100%;padding-bottom:5px;" align="center">
																			<h1 style="margin: 0; color: #222222; direction: ltr; font-family: TimesNewRoman, 'Times New Roman', Times, Beskerville, Georgia, serif; font-size: 22px; font-weight: 400; letter-spacing: -1px; line-height: 1.2; text-align: center; margin-top: 0; margin-bottom: 0; mso-line-height-alt: 26px;">Journey</h1>
																		</td>
																	</tr>
																</table>
																<table class="paragraph_block block-2" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
																	<tr>
																		<td class="pad">
																			<div style="color:#222222;direction:ltr;font-family:'Helvetica Neue', Helvetica, Arial, sans-serif;font-size:30px;font-weight:700;letter-spacing:0px;line-height:1.2;text-align:center;mso-line-height-alt:36px;">
																				<p style="margin: 0;">Stay connected always</p>
																			</div>
																		</td>
																	</tr>
																</table>
																<table class="paragraph_block block-3" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
																	<tr>
																		<td class="pad">
																			<div style="color:#222222;direction:ltr;font-family:'Helvetica Neue', Helvetica, Arial, sans-serif;font-size:16px;font-weight:400;letter-spacing:0px;line-height:1.2;text-align:center;mso-line-height-alt:19px;">
																				<p style="margin: 0;">Receive future poems, new writings, updates, and reflective content.</p>
																			</div>
																		</td>
																	</tr>
																</table>
																<table class="button_block block-4" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
																	<tr>
																		<td class="pad" align="center"><a href="https://satinderpoetry.com" target="_blank" style="color:#ffffff;text-decoration:none;"><!--[if mso]>
<v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word"  href="https://satinderpoetry.com"  style="height:37px;width:175px;v-text-anchor:middle;" arcsize="25%" fillcolor="#007c86">
<v:stroke dashstyle="Solid" weight="1px" color="#222222"/>
<w:anchorlock/>
<v:textbox inset="0px,0px,0px,0px">
<center dir="false" style="color:#ffffff;font-family:Arial, sans-serif;font-size:14px">
<![endif]--><span class="button" style="background-color: #007c86; border-bottom: 1px solid #222222; border-left: 1px solid #222222; border-radius: 10px; border-right: 1px solid #222222; border-top: 1px solid #222222; color: #ffffff; display: inline-block; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 400; mso-border-alt: none; text-align: center; width: auto; word-break: keep-all; letter-spacing: 1px;"><span class="btn-pad" style="word-break: break-word; padding-left: 15px; padding-right: 15px; padding-top: 5px; padding-bottom: 5px; display: block;"><span style="word-break: break-word; line-height: 28px;">VIEW AVAILABILITY</span></span></span><!--[if mso]></center></v:textbox></v:roundrect><![endif]--></a></td>
																	</tr>
																</table>
															</td>
														</tr>
													</table>
												</td>
											</tr>
										</tbody>
									</table>
								</td>
							</tr>
						</tbody>
					</table>
					<table class="row row-9" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
						<tbody>
							<tr>
								<td>
									<table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-image: url('https://d1oco4z2z1fhwp.cloudfront.net/templates/default/8741/BEE_May20_MarketingAgency_Onboarding_v06_copy.jpg'); background-position: top center; background-repeat: no-repeat; background-size: auto; border-radius: 0; color: #000000; width: 650px; margin: 0 auto;" width="650">
										<tbody>
											<tr>
												<td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top;">
													<div class="spacer_block block-1" style="height:60px;line-height:60px;font-size:1px;">&#8202;</div>
												</td>
											</tr>
										</tbody>
									</table>
								</td>
							</tr>
						</tbody>
					</table>
					<table class="row row-10" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-size: auto;">
						<tbody>
							<tr>
								<td>
									<table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #f6f5f1; background-size: auto; border-radius: 0; color: #000000; width: 650px; margin: 0 auto;" width="650">
										<tbody>
											<tr>
												<td class="column column-1" width="41.666666666666664%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: middle;">
													<table class="image_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
														<tr>
															<td class="pad" style="width:100%;" align="center">
																<div style="max-width: 270px;"><a href="https://satinderpoetry.com" target="_blank"><img src="https://228fe3e270.imgdist.com/pub/bfra/jp6v7hcl/izb/5jb/smm/ChatGPT%20Image%20May%2023%2C%202026%2C%2010_20_07%20AM.png" style="display: block; height: auto; border: 0; width: 100%;" width="270" alt="Satinder Poetry Image." title="Satinder Poetry Image." height="auto"></a></div>
															</td>
														</tr>
													</table>
												</td>
												<td class="column column-2" width="58.333333333333336%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; background-color: #ddd988; vertical-align: middle;">
													<table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
														<tr>
															<td class="col-pad" style="padding-bottom:30px;padding-left:50px;padding-right:50px;padding-top:30px;">
																<table class="paragraph_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
																	<tr>
																		<td class="pad">
																			<div style="color:#222222;direction:ltr;font-family:'Helvetica Neue', Helvetica, Arial, sans-serif;font-size:36px;font-weight:700;letter-spacing:0px;line-height:1.2;text-align:left;mso-line-height-alt:43px;">
																				<p style="margin: 0;">About</p>
																			</div>
																		</td>
																	</tr>
																</table>
																<table class="paragraph_block block-2" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
																	<tr>
																		<td class="pad">
																			<div style="color:#222222;direction:ltr;font-family:TimesNewRoman, 'Times New Roman', Times, Beskerville, Georgia, serif;font-size:36px;font-weight:400;letter-spacing:0px;line-height:1.2;text-align:left;mso-line-height-alt:43px;">
																				<p style="margin: 0;">Satinder Poetry</p>
																			</div>
																		</td>
																	</tr>
																</table>
																<table class="paragraph_block block-3" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
																	<tr>
																		<td class="pad" style="padding-top:10px;padding-bottom:15px;padding-right:30px;">
																			<div style="color:#222222;direction:ltr;font-family:'Helvetica Neue', Helvetica, Arial, sans-serif;font-size:16px;font-weight:400;letter-spacing:0px;line-height:1.2;text-align:left;mso-line-height-alt:19px;">
																				<p style="margin: 0;">Satinder Poetry is a space built<br>around emotion, silence,<br>reflection, and meaningful words.<br><br>Every poem is written to create<br>comfort, connection, and calm<br>through storytelling and poetry.</p>
																			</div>
																		</td>
																	</tr>
																</table>
																<table class="button_block block-4" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
																	<tr>
																		<td class="pad" align="left"><a href="https://satinderpoetry.com" target="_blank" style="color:#222222;text-decoration:none;"><!--[if mso]>
<v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word"  href="https://satinderpoetry.com"  style="height:37px;width:165px;v-text-anchor:middle;" arcsize="25%" fillcolor="#f6f5f1">
<v:stroke dashstyle="Solid" weight="1px" color="#222222"/>
<w:anchorlock/>
<v:textbox inset="0px,0px,0px,0px">
<center dir="false" style="color:#222222;font-family:Arial, sans-serif;font-size:14px">
<![endif]--><span class="button" style="background-color: #f6f5f1; border-bottom: 1px solid #222222; border-left: 1px solid #222222; border-radius: 10px; border-right: 1px solid #222222; border-top: 1px solid #222222; color: #222222; display: inline-block; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 400; mso-border-alt: none; text-align: center; width: 60%; word-break: keep-all; letter-spacing: 1px;"><span class="btn-pad" style="word-break: break-word; padding-left: 15px; padding-right: 15px; padding-top: 5px; padding-bottom: 5px; display: block;"><span style="word-break: break-word; line-height: 28px;">READ MORE</span></span></span><!--[if mso]></center></v:textbox></v:roundrect><![endif]--></a></td>
																	</tr>
																</table>
															</td>
														</tr>
													</table>
												</td>
											</tr>
										</tbody>
									</table>
								</td>
							</tr>
						</tbody>
					</table>
					<table class="row row-11" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-size: auto;">
						<tbody>
							<tr>
								<td>
									<table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #f7a12d; background-size: auto; border-radius: 0; color: #000000; width: 650px; margin: 0 auto;" width="650">
										<tbody>
											<tr>
												<td class="column column-1" width="58.333333333333336%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: middle;">
													<table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
														<tr>
															<td class="col-pad" style="padding-bottom:50px;padding-left:50px;padding-right:50px;padding-top:50px;">
																<table class="paragraph_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
																	<tr>
																		<td class="pad" style="padding-top:5px;">
																			<div style="color:#222222;direction:ltr;font-family:'Helvetica Neue', Helvetica, Arial, sans-serif;font-size:36px;font-weight:700;letter-spacing:0px;line-height:1.2;text-align:left;mso-line-height-alt:43px;">
																				<p style="margin: 0;">About</p>
																			</div>
																		</td>
																	</tr>
																</table>
																<table class="paragraph_block block-2" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
																	<tr>
																		<td class="pad">
																			<div style="color:#222222;direction:ltr;font-family:TimesNewRoman, 'Times New Roman', Times, Beskerville, Georgia, serif;font-size:36px;font-weight:400;letter-spacing:0px;line-height:1.2;text-align:left;mso-line-height-alt:43px;">
																				<p style="margin: 0;"><em>Me - Satinder Singh Sall</em></p>
																			</div>
																		</td>
																	</tr>
																</table>
																<table class="paragraph_block block-3" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
																	<tr>
																		<td class="pad" style="padding-top:10px;padding-bottom:15px;">
																			<div style="color:#222222;direction:ltr;font-family:'Helvetica Neue', Helvetica, Arial, sans-serif;font-size:16px;font-weight:400;letter-spacing:0px;line-height:1.2;text-align:left;mso-line-height-alt:19px;">
																				<p style="margin: 0;">I build high-performance<br>full-stack applications focused on<br>modern UI/UX, scalability,<br>security, and meaningful<br>digital experiences.<br><br>Beyond engineering, I’m deeply<br>drawn to poetry, stories,<br>reflections, and emotional writing.<br><br>Currently pursuing an MCA at<br>KIIT University while exploring<br>modern web engineering,<br>game development, and<br>immersive storytelling.</p>
																			</div>
																		</td>
																	</tr>
																</table>
																<table class="button_block block-4" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
																	<tr>
																		<td class="pad" align="left"><a href="https://satinder-portfolio.vercel.app" target="_blank" style="color:#222222;text-decoration:none;"><!--[if mso]>
<v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word"  href="https://satinder-portfolio.vercel.app"  style="height:37px;width:165px;v-text-anchor:middle;" arcsize="25%" fillcolor="#f6f5f1">
<v:stroke dashstyle="Solid" weight="1px" color="#222222"/>
<w:anchorlock/>
<v:textbox inset="0px,0px,0px,0px">
<center dir="false" style="color:#222222;font-family:Arial, sans-serif;font-size:14px">
<![endif]--><span class="button" style="background-color: #f6f5f1; border-bottom: 1px solid #222222; border-left: 1px solid #222222; border-radius: 10px; border-right: 1px solid #222222; border-top: 1px solid #222222; color: #222222; display: inline-block; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 400; mso-border-alt: none; text-align: center; width: 60%; word-break: keep-all; letter-spacing: 1px;"><span class="btn-pad" style="word-break: break-word; padding-left: 15px; padding-right: 15px; padding-top: 5px; padding-bottom: 5px; display: block;"><span style="word-break: break-word; line-height: 28px;">VISIT PORTFOLIO</span></span></span><!--[if mso]></center></v:textbox></v:roundrect><![endif]--></a></td>
																	</tr>
																</table>
															</td>
														</tr>
													</table>
												</td>
												<td class="column column-2" width="41.666666666666664%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: middle;">
													<table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
														<tr>
															<td class="col-pad" style="padding-bottom:5px;padding-right:50px;padding-top:5px;">
																<table class="image_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
																	<tr>
																		<td class="pad" style="width:100%;" align="center">
																			<div style="max-width: 220.83333333333337px;"><a href="https://satinder-portfolio.vercel.app" target="_blank"><img src="" alt="Satinder Poetry Image." title="Satinder Poetry Image." height="auto"></a></div>
																		</td>
																	</tr>
																</table>
															</td>
														</tr>
													</table>
												</td>
											</tr>
										</tbody>
									</table>
								</td>
							</tr>
						</tbody>
					</table>
					<table class="row row-12" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
						<tbody>
							<tr>
								<td>
									<table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #f6f5f1; background-image: url('https://d1oco4z2z1fhwp.cloudfront.net/templates/default/8741/BG-texture-02.jpg'); background-repeat: no-repeat; border-radius: 0; color: #000000; width: 650px; margin: 0 auto;" width="650">
										<tbody>
											<tr>
												<td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top;">
													<table class="button_block block-1" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
														<tr>
															<td class="pad" align="center"><a href="https://satinder-portfolio.vercel.app" target="_blank" style="color:#ffffff;text-decoration:none;"><!--[if mso]>
<v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word"  href="https://satinder-portfolio.vercel.app"  style="height:42px;width:261px;v-text-anchor:middle;" arcsize="10%" fillcolor="#7747FF">
<v:stroke dashstyle="Solid" weight="0px" color="#7747FF"/>
<w:anchorlock/>
<v:textbox inset="0px,0px,0px,0px">
<center dir="false" style="color:#ffffff;font-family:sans-serif;font-size:16px">
<![endif]--><span class="button" style="background-color: #7747FF; border-bottom: 0px solid transparent; border-left: 0px solid transparent; border-radius: 4px; border-right: 0px solid transparent; border-top: 0px solid transparent; color: #ffffff; display: inline-block; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; mso-border-alt: none; text-align: center; width: auto; word-break: keep-all; letter-spacing: normal;"><span class="btn-pad" style="word-break: break-word; padding-left: 20px; padding-right: 20px; padding-top: 5px; padding-bottom: 5px; display: block;"><span style="word-break: break-word; line-height: 32px;">&nbsp;VISIT MY PORTFOLIO PAGE&nbsp;</span></span></span><!--[if mso]></center></v:textbox></v:roundrect><![endif]--></a></td>
														</tr>
													</table>
												</td>
											</tr>
										</tbody>
									</table>
								</td>
							</tr>
						</tbody>
					</table>
					<table class="row row-13" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
						<tbody>
							<tr>
								<td>
									<table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #f6f5f1; background-image: url('https://d1oco4z2z1fhwp.cloudfront.net/templates/default/8741/BG-texture-02.jpg'); background-repeat: no-repeat; border-radius: 0; color: #000000; width: 650px; margin: 0 auto;" width="650">
										<tbody>
											<tr>
												<td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top;">
													<table class="icons_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; text-align: center; line-height: 0;">
														<tr>
															<td class="pad" style="vertical-align: middle; color: #000000; font-family: inherit; font-size: 14px; font-weight: 400;" align="center">
																<table class="icons-outer" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; display: inline-table;">
																	<tr>
																		<td style="vertical-align: middle; text-align: center; padding-top: 5px; padding-bottom: 5px; padding-left: 5px; padding-right: 5px;"><img class="icon" src="https://app-rsrc.getbee.io/public/resources/placeholders/custom-icon-placeholder.png" alt="" height="auto" width="32" align="center" style="display: block; height: auto; margin: 0 auto; border: 0;"></td>
																	</tr>
																</table>
															</td>
														</tr>
													</table>
												</td>
											</tr>
										</tbody>
									</table>
								</td>
							</tr>
						</tbody>
					</table>
					<table class="row row-14" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
						<tbody>
							<tr>
								<td>
									<table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #f6f5f1; border-radius: 0; color: #000000; width: 650px; margin: 0 auto;" width="650">
										<tbody>
											<tr>
												<td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top;">
													<table class="image_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
														<tr>
															<td class="pad" style="width:100%;" align="center">
																<div style="max-width: 650px;"><img src="https://d1oco4z2z1fhwp.cloudfront.net/templates/default/8741/BEE_May20_MarketingAgency_Invoice_v01.jpg" style="display: block; height: auto; border: 0; width: 100%;" width="650" alt="" title="" height="auto"></div>
															</td>
														</tr>
													</table>
												</td>
											</tr>
										</tbody>
									</table>
								</td>
							</tr>
						</tbody>
					</table>
					<table class="row row-15" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-size: auto;">
						<tbody>
							<tr>
								<td>
									<table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #007c86; background-size: auto; color: #000000; width: 650px; margin: 0 auto;" width="650">
										<tbody>
											<tr>
												<td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top;">
													<table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
														<tr>
															<td class="col-pad" style="padding-bottom:15px;padding-left:20px;padding-right:20px;padding-top:15px;">
																<div class="spacer_block block-1" style="height:40px;line-height:40px;font-size:1px;">&#8202;</div>
																<table class="paragraph_block block-2" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
																	<tr>
																		<td class="pad" style="padding-top:20px;padding-bottom:30px;padding-left:10px;padding-right:10px;">
																			<div style="color:#ffffff;direction:ltr;font-family:'Helvetica Neue', Helvetica, Arial, sans-serif;font-size:20px;font-weight:400;letter-spacing:2px;line-height:1.2;text-align:center;mso-line-height-alt:24px;">
																				<p style="margin: 0;">SATINDER POETRY</p>
																			</div>
																		</td>
																	</tr>
																</table>
																<table class="social_block block-3" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
																	<tr>
																		<td class="pad" style="padding-bottom:10px;" align="center">
																			<table class="social-table" width="200px" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
																				<tr>
																					<td style="padding:0 0 0 0px;"><a href="https://www.linkedin.com/in/satinder-singh-sall-b62049204/" target="_blank"><img src="https://app-rsrc.getbee.io/public/resources/social-networks-icon-sets/circle-color/linkedin@2x.png" width="32" height="auto" alt="LinkedIn" title="LinkedIn" style="display: block; height: auto; border: 0;"></a></td>
																					<td style="padding:0 0 0 10px;"><a href="https://www.instagram.com/satindersinghsall" target="_blank"><img src="https://app-rsrc.getbee.io/public/resources/social-networks-icon-sets/circle-color/instagram@2x.png" width="32" height="auto" alt="Instagram" title="Instagram" style="display: block; height: auto; border: 0;"></a></td>
																					<td style="padding:0 0 0 10px;"><a href="https://www.youtube.com/@satindersinghsall.3841/featured" target="_blank"><img src="https://app-rsrc.getbee.io/public/resources/social-networks-icon-sets/circle-color/youtube@2x.png" width="32" height="auto" alt="YouTube" title="YouTube" style="display: block; height: auto; border: 0;"></a></td>
																					<td style="padding:0 0 0 10px;"><a href="https://x.com/SallSatinder" target="_blank"><img src="https://app-rsrc.getbee.io/public/resources/social-networks-icon-sets/circle-color/x@2x.png" width="32" height="auto" alt="X" title="X" style="display: block; height: auto; border: 0;"></a></td>
																					<td style="padding:0 0 0 10px;"><a href="https://www.facebook.com/satinder.singhsall" target="_blank"><img src="https://app-rsrc.getbee.io/public/resources/social-networks-icon-sets/circle-color/facebook@2x.png" width="32" height="auto" alt="Facebook" title="Facebook" style="display: block; height: auto; border: 0;"></a></td>
																				</tr>
																			</table>
																		</td>
																	</tr>
																</table>
																<table class="paragraph_block block-4" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
																	<tr>
																		<td class="pad">
																			<div style="color:#ffffff;direction:ltr;font-family:'Helvetica Neue', Helvetica, Arial, sans-serif;font-size:14px;font-weight:400;letter-spacing:0px;line-height:1.2;text-align:center;mso-line-height-alt:17px;">
																				<p style="margin: 0;">Poetry • Stories • Reflections<br>Crafted with emotion and simplicity.</p>
																			</div>
																		</td>
																	</tr>
																</table>
																<table class="paragraph_block block-5" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
																	<tr>
																		<td class="pad">
																			<div style="color:#ffffff;direction:ltr;font-family:'Helvetica Neue', Helvetica, Arial, sans-serif;font-size:14px;font-weight:400;letter-spacing:0px;line-height:1.2;text-align:center;mso-line-height-alt:17px;">
																				<p style="margin: 0;"><a href="http://example.com/unsubcribe" target="_blank" style="text-decoration: underline; color: #ffffff;" rel="noopener"></a><a href="https://satinderpoetry.com/profile" target="_blank" style="text-decoration: underline; color: #ffffff;" rel="noopener"></a><a href="https://satinderpoetry.com/profile" target="_blank" style="text-decoration: underline; color: #ffffff;" rel="noopener"></a><a href="https://satinderpoetry.com/profile" target="_blank" style="text-decoration: underline; color: #ffffff;" rel="noopener"></a><a href="https://satinderpoetry.com/profile" target="_blank" style="text-decoration: underline; color: #ffffff;" rel="noopener">Unsubscribe</a> or <a href="https://satinderpoetry.com/profile" target="_blank" style="text-decoration: underline; color: #ffffff;" rel="noopener">Manage Preferences</a><a href="https://satinderpoetry.com/profile" target="_blank" style="text-decoration: underline; color: #ffffff;" rel="noopener"></a><a href="https://satinderpoetry.com/profile" target="_blank" style="text-decoration: underline; color: #ffffff;" rel="noopener"></a></p>
																			</div>
																		</td>
																	</tr>
																</table>
																<div class="spacer_block block-6" style="height:40px;line-height:40px;font-size:1px;">&#8202;</div>
															</td>
														</tr>
													</table>
												</td>
											</tr>
										</tbody>
									</table>
								</td>
							</tr>
						</tbody>
					</table>
					<table class="row row-16" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
						<tbody>
							<tr>
								<td>
									<table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #f6f5f1; background-image: url('https://d1oco4z2z1fhwp.cloudfront.net/templates/default/8741/BG-texture-02.jpg'); background-repeat: no-repeat; border-radius: 0; color: #000000; width: 650px; margin: 0 auto;" width="650">
										<tbody>
											<tr>
												<td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top;">
													<table class="image_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
														<tr>
															<td class="pad" style="width:100%;" align="center">
																<div style="max-width: 650px;"><img src="https://228fe3e270.imgdist.com/pub/bfra/jp6v7hcl/vfu/uho/prq/Satinder%20Poetry%20-%20Logo.png" style="display: block; height: auto; border: 0; width: 100%;" width="650" alt="" title="" height="auto"></div>
															</td>
														</tr>
													</table>
												</td>
											</tr>
										</tbody>
									</table>
								</td>
							</tr>
						</tbody>
					</table>
					<table class="row row-17" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
						<tbody>
							<tr>
								<td>
									<table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-radius: 0; color: #000000; width: 650px; margin: 0 auto;" width="650">
										<tbody>
											<tr>
												<td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top;">
													<table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
														<tr>
															<td class="col-pad" style="padding-bottom:5px;padding-top:5px;">
																<table class="icons_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; text-align: center; line-height: 0;">
																	<tr>
																		<td class="pad" style="vertical-align: middle; color: #140231; font-family: inherit; font-size: 14px; font-weight: 400; letter-spacing: 0px;" align="center"><!--[if vml]><table align="center" cellpadding="0" cellspacing="0" role="presentation" style="display:inline-block;padding-left:0px;padding-right:0px;mso-table-lspace: 0pt;mso-table-rspace: 0pt;" ><![endif]-->
																			<!--[if !vml]><!-->
																			<table class="icons-inner" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; display: inline-block; padding-left: 0px; padding-right: 0px;" cellpadding="0" cellspacing="0" role="presentation"><!--<![endif]-->
																				<tr>
																					<td style="vertical-align: middle; text-align: center; padding-top: 10px; padding-bottom: 10px; padding-left: 10px; padding-right: 10px;"><a href="https://designedwithbeefree.com/" target="_self" title="" style="text-decoration: none;"><img class="icon" alt="Smiles Davis - RGE Studio logo" src="https://d15k2d11r6t6rl.cloudfront.net/pub/bfra/pr9telna/6fl/6ah/2jk/RGE%20logo.png" height="auto" width="32.29090909090909" align="center" style="display: block; height: auto; margin: 0 auto; border: 0;"></a></td>
																					<td style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 400; color: #140231; vertical-align: middle; letter-spacing: normal; text-align: center; line-height: normal;"><a href="https://designedwithbeefree.com/" target="_self" title="" style="color: #140231; text-decoration: none;">Designed with RGE Studio</a></td>
																				</tr>
																			</table>
																		</td>
																	</tr>
																</table>
															</td>
														</tr>
													</table>
												</td>
											</tr>
										</tbody>
									</table>
								</td>
							</tr>
						</tbody>
					</table>
				</td>
			</tr>
		</tbody>
	</table><!-- End -->
</body>

</html>
`,
  });
};

module.exports = {
  sendMail,
  sendWelcomeEmail,
};
