const Email = require("../models/SubscribeEmail");
const { sendMail } = require("../config/mailer");

exports.subscribeUser = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  try {
    const exists = await Email.findOne({ email });
    if (exists) {
      return res
        .status(400)
        .json({ message: "This email is already subscribed!" });
    }

    await Email.create({ email });

    await sendMail({
      to: email,
      subject: "✨ Welcome to Satinder Poetry",
      html: `
<!DOCTYPE html>
<html xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="en-US">

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

		.row-8 .column-1 .block-4 .button:hover {
			background-color: #fb421f !important;
			border-bottom: 0 solid transparent !important;
			border-left: 0 solid transparent !important;
			border-right: 0 solid transparent !important;
			border-top: 0 solid transparent !important;
			color: #101112 !important;
		}

		.row-2 .column-1 .block-4 .button:hover,
		.row-3 .column-1 .block-4 .button:hover,
		.row-4 .column-2 .block-5 .button:hover {
			background-color: #ffffff !important;
			border-bottom: 0 solid transparent !important;
			border-left: 0 solid transparent !important;
			border-right: 0 solid transparent !important;
			border-top: 0 solid transparent !important;
			color: #101112 !important;
		}

		@media (max-width: 720px) {
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

			.reverse {
				display: table;
				width: 100%;
			}

			.reverse .column.first {
				display: table-footer-group !important;
			}

			.reverse .column.last {
				display: table-header-group !important;
			}

			.row-2 .column-1 .block-1.image_block td.pad {
				padding: 10px 0 20px 0 !important;
			}

			.row-2 .column-1 .block-2.heading_block h1 {
				font-size: 43px !important;
			}

			.row-2 .column-1 .block-3.paragraph_block td.pad {
				padding: 10px 25px !important;
			}

			.row-2 .column-1 .block-5.image_block td.pad {
				padding: 0 20px !important;
			}

			.row-7 .column-2 .block-5.image_block td.pad {
				padding: 5px 10px 45px 10px !important;
			}

			.row-13 .column-3 .block-1.paragraph_block td.pad>div {
				text-align: center !important;
				font-size: 16px !important;
			}

			.row-3 .column-1 .col-pad {
				padding: 5px 15px 45px 15px !important;
			}

			.desktop_hide table.icons-inner,
			.social_block .social-table {
				display: inline-block !important;
			}

			.row-3 .column-1 .block-2.heading_block h2,
			.row-3 .column-1 .block-3.paragraph_block td.pad>div,
			.row-3 .column-1 .block-4.button_block td.pad,
			.row-4 .column-2 .block-3.heading_block h2,
			.row-4 .column-2 .block-4.paragraph_block td.pad>div,
			.row-4 .column-2 .block-5.button_block td.pad,
			.row-7 .column-1 .block-2.heading_block h3,
			.row-7 .column-1 .block-3.paragraph_block td.pad>div,
			.row-7 .column-1 .block-4.paragraph_block td.pad>div,
			.row-7 .column-2 .block-3.paragraph_block td.pad>div,
			.row-7 .column-2 .block-4.paragraph_block td.pad>div,
			.row-7 .column-2 .block-2.heading_block h3 {
				text-align: center !important;
			}

			.row-3 .column-1 .block-1.button_block td.pad,
			.row-4 .column-2 .block-2.button_block td.pad,
			.row-6 .column-1 .block-2.button_block td.pad,
			.row-8 .column-1 .block-1.button_block td.pad,
			.row-10 .column-1 .block-1.button_block td.pad,
			.row-13 .column-2 .block-1.social_block td.pad {
				text-align: center !important;
				padding: 10px !important;
			}

			.row-3 .column-1 .block-1.button_block span,
			.row-4 .column-2 .block-2.button_block span,
			.row-6 .column-1 .block-2.button_block span,
			.row-8 .column-1 .block-1.button_block span,
			.row-10 .column-1 .block-1.button_block span {
				font-size: 9px !important;
				line-height: 18px !important;
			}

			.row-3 .column-2 .block-3.spacer_block,
			.row-4 .column-2 .block-1.spacer_block {
				height: 15px !important;
			}

			.row-3 .column-1 .block-4.button_block span,
			.row-4 .column-2 .block-5.button_block span {
				line-height: 32px !important;
			}

			.row-7 .column-1 .block-1.image_block td.pad div,
			.row-7 .column-1 .block-5.image_block td.pad div,
			.row-7 .column-2 .block-1.image_block td.pad div,
			.row-7 .column-2 .block-5.image_block td.pad div {
				margin: 0 auto !important;
			}

			.row-7 .column-2 .block-3.paragraph_block td.pad,
			.row-13 .column-3 .block-1.paragraph_block td.pad {
				padding: 10px !important;
			}

			.row-4 .column-1 .col-pad,
			.row-4 .column-2 .col-pad,
			.row-7 .column-1 .col-pad,
			.row-7 .column-2 .col-pad,
			.row-10 .column-1 .col-pad {
				padding: 5px 15px !important;
			}
		}
	</style><!--[if mso ]><style>sup, sub { font-size: 100% !important; } sup { mso-text-raise:10% } sub { mso-text-raise:-10% }</style> <![endif]-->
</head>

<body class="body" style="margin: 0; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none; background-color: #ffffff;">
	<table class="nl-container" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff;">
		<tbody>
			<tr>
				<td>
					<table class="row row-1" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #fdfbf8;">
						<tbody>
							<tr>
								<td>
									<table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-radius: 0; color: #000000; width: 700px; margin: 0 auto;" width="700">
										<tbody>
											<tr>
												<td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top;">
													<table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
														<tr>
															<td class="col-pad" style="padding-bottom:5px;padding-top:5px;">
																<div class="spacer_block block-1" style="height:15px;line-height:15px;font-size:1px;">&#8202;</div>
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
					<table class="row row-2" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #fdfbf8; background-size: auto;">
						<tbody>
							<tr>
								<td>
									<table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #f6f2ea; background-image: url('https://d1oco4z2z1fhwp.cloudfront.net/templates/default/10666/degree-orange-v6.svg'); background-repeat: no-repeat; background-size: cover; border-radius: 20px 20px 0 0; color: #000000; width: 700px; margin: 0 auto;" width="700">
										<tbody>
											<tr>
												<td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top;">
													<table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
														<tr>
															<td class="col-pad" style="padding-bottom:5px;padding-top:5px;">
																<table class="image_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
																	<tr>
																		<td class="pad" style="width:100%;padding-top:20px;padding-bottom:40px;" align="center">
																			<div style="max-width: 700px;"><a href="https://satinderpoetry.com" target="_blank"><img src="https://228fe3e270.imgdist.com/pub/bfra/jp6v7hcl/vfu/uho/prq/Satinder%20Poetry%20-%20Logo.png" style="display: block; height: auto; border: 0; width: 100%;" width="700" alt="Logo" title="Logo" height="auto"></a></div>
																		</td>
																	</tr>
																</table>
																<table class="heading_block block-2" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
																	<tr>
																		<td class="pad" style="width:100%;" align="center">
																			<h1 style="margin: 0; color: #090a0b; direction: ltr; font-family: Arial, Helvetica, sans-serif; font-size: 40px; font-weight: 700; letter-spacing: -2px; line-height: 1.2; text-align: center; margin-top: 0; margin-bottom: 0; mso-line-height-alt: 48px;">Welcome to Satinder Poetry ✨</h1>
																		</td>
																	</tr>
																</table>
																<table class="paragraph_block block-3" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
																	<tr>
																		<td class="pad" style="padding-top:10px;padding-bottom:10px;padding-left:60px;padding-right:60px;">
																			<div style="color:#090a0b;direction:ltr;font-family:Arial, Helvetica, sans-serif;font-size:16px;font-weight:400;letter-spacing:0px;line-height:1.8;text-align:center;mso-line-height-alt:29px;">
																				<p style="margin: 0;">Thank you for subscribing to Satinder Poetry.<br><br>You’ll now receive heartfelt poems, reflective writing,<br>and updates whenever new poetry is published.</p>
																			</div>
																		</td>
																	</tr>
																</table>
																<table class="button_block block-4" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
																	<tr>
																		<td class="pad" style="padding-top:10px;padding-bottom:25px;padding-left:10px;padding-right:10px;" align="center"><a href="https://satinderpoetry.com" target="_blank" style="color:#ffffff;text-decoration:none;"><!--[if mso]>
<v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word"  href="https://satinderpoetry.com"  style="height:62px;width:188px;v-text-anchor:middle;" arcsize="49%" fillcolor="#090a0b">
<v:stroke dashstyle="Solid" weight="0px" color="#090a0b"/>
<w:anchorlock/>
<v:textbox inset="0px,0px,0px,0px">
<center dir="false" style="color:#ffffff;font-family:sans-serif;font-size:16px">
<![endif]--><span class="button" style="background-color: #090a0b; border-bottom: 0px solid transparent; border-left: 0px solid transparent; border-radius: 30px; border-right: 0px solid transparent; border-top: 0px solid transparent; color: #ffffff; display: inline-block; font-family: Arial, Helvetica, sans-serif; font-size: 16px; font-weight: 400; mso-border-alt: none; text-align: center; width: auto; word-break: keep-all; letter-spacing: normal;"><span class="btn-pad" style="word-break: break-word; padding-left: 30px; padding-right: 30px; padding-top: 15px; padding-bottom: 15px; display: block;"><span style="word-break: break-word; line-height: 32px;">Explore Poems ➜</span></span></span><!--[if mso]></center></v:textbox></v:roundrect><![endif]--></a></td>
																	</tr>
																</table>
																<table class="image_block block-5" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
																	<tr>
																		<td class="pad" style="width:100%;" align="center">
																			<div class="fullWidth" style="max-width: 580px;"><a href="https://satinderpoetry.com" target="_blank"><img src="https://228fe3e270.imgdist.com/pub/bfra/jp6v7hcl/odv/t1l/hoa/Screenshot%20%284545%29.png" style="display: block; height: auto; border: 0; width: 100%; border-radius: 16px;" width="580" alt="Dashboard" title="Dashboard" height="auto"></a></div>
																		</td>
																	</tr>
																</table>
																<div class="spacer_block block-6 mobile_hide" style="height:45px;line-height:45px;font-size:1px;">&#8202;</div>
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
					<table class="row row-3" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #fdfbf8; background-size: auto;">
						<tbody>
							<tr>
								<td>
									<table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #f6f2ea; background-image: url('https://d1oco4z2z1fhwp.cloudfront.net/templates/default/10666/degree-orange-v3.svg'); background-repeat: no-repeat; background-size: cover; border-radius: 0; color: #000000; width: 700px; margin: 0 auto;" width="700">
										<tbody>
											<tr class="reverse">
												<td class="column column-1 first" width="50%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: middle;">
													<table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
														<tr>
															<td class="col-pad" style="padding-bottom:5px;padding-left:25px;padding-top:5px;">
																<table class="button_block block-1" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
																	<tr>
																		<td class="pad" align="left"><a href="https://www.example.com" target="_blank" style="color:#101112;text-decoration:none;"><!--[if mso]>
<v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word"  href="https://www.example.com"  style="height:22px;width:184px;v-text-anchor:middle;" arcsize="19%" fillcolor="#e3ddd1">
<v:stroke dashstyle="Solid" weight="0px" color="#e3ddd1"/>
<w:anchorlock/>
<v:textbox inset="0px,0px,0px,0px">
<center dir="false" style="color:#101112;font-family:sans-serif;font-size:11px">
<![endif]--><span class="button" style="background-color: #e3ddd1; border-bottom: 0px solid transparent; border-left: 0px solid transparent; border-radius: 4px; border-right: 0px solid transparent; border-top: 0px solid transparent; color: #101112; display: inline-block; font-family: Arial, Helvetica, sans-serif; font-size: 11px; font-weight: 700; mso-border-alt: none; text-align: center; width: auto; word-break: keep-all; letter-spacing: 2px;"><span class="btn-pad" style="word-break: break-word; padding-left: 10px; padding-right: 10px; padding-top: 0px; padding-bottom: 0px; display: block;"><span style="word-break: break-word; line-height: 22px;">WHAT YOU’LL RECEIVE</span></span></span><!--[if mso]></center></v:textbox></v:roundrect><![endif]--></a></td>
																	</tr>
																</table>
																<table class="heading_block block-2" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
																	<tr>
																		<td class="pad" style="width:100%;" align="center">
																			<h2 style="margin: 0; color: #090a0b; direction: ltr; font-family: Arial, Helvetica, sans-serif; font-size: 26px; font-weight: 700; letter-spacing: normal; line-height: 1.5; text-align: left; margin-top: 0; margin-bottom: 0; mso-line-height-alt: 39px;">New Poems Delivered With Emotion</h2>
																		</td>
																	</tr>
																</table>
																<table class="paragraph_block block-3" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
																	<tr>
																		<td class="pad">
																			<div style="color:#535353;direction:ltr;font-family:Arial, Helvetica, sans-serif;font-size:16px;font-weight:400;letter-spacing:0px;line-height:1.8;text-align:left;mso-line-height-alt:29px;">
																				<p style="margin: 0;">Every poem shared through Satinder Poetry is written to express emotion, silence, memories, and reflection.</p>
																			</div>
																		</td>
																	</tr>
																</table>
																<table class="button_block block-4" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
																	<tr>
																		<td class="pad" align="left"><a href="https://satinderpoetry.com/poems" target="_blank" style="color:#ffffff;text-decoration:none;"><!--[if mso]>
<v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word"  href="https://satinderpoetry.com/poems"  style="height:62px;width:220px;v-text-anchor:middle;" arcsize="49%" fillcolor="#090a0b">
<v:stroke dashstyle="Solid" weight="0px" color="#090a0b"/>
<w:anchorlock/>
<v:textbox inset="0px,0px,0px,0px">
<center dir="false" style="color:#ffffff;font-family:sans-serif;font-size:16px">
<![endif]--><span class="button" style="background-color: #090a0b; border-bottom: 0px solid transparent; border-left: 0px solid transparent; border-radius: 30px; border-right: 0px solid transparent; border-top: 0px solid transparent; color: #ffffff; display: inline-block; font-family: Arial, Helvetica, sans-serif; font-size: 16px; font-weight: 400; mso-border-alt: none; text-align: center; width: auto; word-break: keep-all; letter-spacing: normal;"><span class="btn-pad" style="word-break: break-word; padding-left: 30px; padding-right: 30px; padding-top: 15px; padding-bottom: 15px; display: block;"><span style="word-break: break-word; line-height: 32px;">Read Latest Poems ➜</span></span></span><!--[if mso]></center></v:textbox></v:roundrect><![endif]--></a></td>
																	</tr>
																</table>
															</td>
														</tr>
													</table>
												</td>
												<td class="column column-2 last" width="50%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: middle;">
													<table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
														<tr>
															<td class="col-pad" style="padding-bottom:5px;padding-top:5px;">
																<div class="spacer_block block-1" style="height:45px;line-height:45px;font-size:1px;">&#8202;</div>
																<table class="image_block block-2" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
																	<tr>
																		<td class="pad" style="width:100%;" align="center">
																			<div style="max-width: 350px;"><a href="https://satinderpoetry.com" target="_blank"><img src="https://228fe3e270.imgdist.com/pub/bfra/jp6v7hcl/fba/oj4/wh6/ChatGPT%20Image%20May%2023%2C%202026%2C%2009_12_09%20AM.png" style="display: block; height: auto; border: 0; width: 100%; border-radius: 16px;" width="350" alt="Focus Mode" title="Focus Mode" height="auto"></a></div>
																		</td>
																	</tr>
																</table>
																<div class="spacer_block block-3" style="height:45px;line-height:45px;font-size:1px;">&#8202;</div>
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
					<table class="row row-4" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #fdfbf8;">
						<tbody>
							<tr>
								<td>
									<table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #f6f2ea; background-image: url('https://d1oco4z2z1fhwp.cloudfront.net/templates/default/10666/gris-elegant-top.png'); background-repeat: no-repeat; background-size: auto; border-radius: 0; color: #000000; width: 700px; margin: 0 auto;" width="700">
										<tbody>
											<tr>
												<td class="column column-1" width="50%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: middle;">
													<table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
														<tr>
															<td class="col-pad" style="padding-bottom:5px;padding-top:5px;">
																<div class="spacer_block block-1" style="height:45px;line-height:45px;font-size:1px;">&#8202;</div>
																<table class="image_block block-2" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
																	<tr>
																		<td class="pad" style="width:100%;" align="center">
																			<div style="max-width: 350px;"><a href="https://satinderpoetry.com" target="_blank"><img src="https://228fe3e270.imgdist.com/pub/bfra/jp6v7hcl/fah/0nb/di9/ChatGPT%20Image%20May%2023%2C%202026%2C%2009_16_43%20AM.png" style="display: block; height: auto; border: 0; width: 100%; border-radius: 16px;" width="350" alt="Smart Agenda" title="Smart Agenda" height="auto"></a></div>
																		</td>
																	</tr>
																</table>
															</td>
														</tr>
													</table>
												</td>
												<td class="column column-2" width="50%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: middle;">
													<table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
														<tr>
															<td class="col-pad" style="padding-bottom:5px;padding-left:25px;padding-top:5px;">
																<div class="spacer_block block-1" style="height:45px;line-height:45px;font-size:1px;">&#8202;</div>
																<table class="button_block block-2" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
																	<tr>
																		<td class="pad" align="left"><a href="https://www.example.com" target="_blank" style="color:#101112;text-decoration:none;"><!--[if mso]>
<v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word"  href="https://www.example.com"  style="height:22px;width:234px;v-text-anchor:middle;" arcsize="19%" fillcolor="#e3ddd1">
<v:stroke dashstyle="Solid" weight="0px" color="#e3ddd1"/>
<w:anchorlock/>
<v:textbox inset="0px,0px,0px,0px">
<center dir="false" style="color:#101112;font-family:sans-serif;font-size:11px">
<![endif]--><span class="button" style="background-color: #e3ddd1; border-bottom: 0px solid transparent; border-left: 0px solid transparent; border-radius: 4px; border-right: 0px solid transparent; border-top: 0px solid transparent; color: #101112; display: inline-block; font-family: Arial, Helvetica, sans-serif; font-size: 11px; font-weight: 700; mso-border-alt: none; text-align: center; width: auto; word-break: keep-all; letter-spacing: 2px;"><span class="btn-pad" style="word-break: break-word; padding-left: 10px; padding-right: 10px; padding-top: 0px; padding-bottom: 0px; display: block;"><span style="word-break: break-word; line-height: 22px;">WHY READ SATINDER POETRY</span></span></span><!--[if mso]></center></v:textbox></v:roundrect><![endif]--></a></td>
																	</tr>
																</table>
																<table class="heading_block block-3" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
																	<tr>
																		<td class="pad" style="width:100%;" align="center">
																			<h2 style="margin: 0; color: #090a0b; direction: ltr; font-family: Arial, Helvetica, sans-serif; font-size: 26px; font-weight: 700; letter-spacing: normal; line-height: 1.2; text-align: left; margin-top: 0; margin-bottom: 0; mso-line-height-alt: 31px;">A Calm Place For Readers &amp; Feelings</h2>
																		</td>
																	</tr>
																</table>
																<table class="paragraph_block block-4" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
																	<tr>
																		<td class="pad">
																			<div style="color:#535353;direction:ltr;font-family:Arial, Helvetica, sans-serif;font-size:16px;font-weight:400;letter-spacing:0px;line-height:1.8;text-align:left;mso-line-height-alt:29px;">
																				<p style="margin: 0;">Minimal distractions, peaceful reading,<br>and emotional storytelling crafted with simplicity.</p>
																			</div>
																		</td>
																	</tr>
																</table>
																<table class="button_block block-5" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
																	<tr>
																		<td class="pad" align="left"><a href="https://satinderpoetry.com/poems" target="_blank" style="color:#ffffff;text-decoration:none;"><!--[if mso]>
<v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word"  href="https://satinderpoetry.com/poems"  style="height:62px;width:235px;v-text-anchor:middle;" arcsize="49%" fillcolor="#090a0b">
<v:stroke dashstyle="Solid" weight="0px" color="#090a0b"/>
<w:anchorlock/>
<v:textbox inset="0px,0px,0px,0px">
<center dir="false" style="color:#ffffff;font-family:sans-serif;font-size:16px">
<![endif]--><span class="button" style="background-color: #090a0b; border-bottom: 0px solid transparent; border-left: 0px solid transparent; border-radius: 30px; border-right: 0px solid transparent; border-top: 0px solid transparent; color: #ffffff; display: inline-block; font-family: Arial, Helvetica, sans-serif; font-size: 16px; font-weight: 400; mso-border-alt: none; text-align: center; width: auto; word-break: keep-all; letter-spacing: normal;"><span class="btn-pad" style="word-break: break-word; padding-left: 30px; padding-right: 30px; padding-top: 15px; padding-bottom: 15px; display: block;"><span style="word-break: break-word; line-height: 32px;">Visit Poetry Collection ➜</span></span></span><!--[if mso]></center></v:textbox></v:roundrect><![endif]--></a></td>
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
					<table class="row row-5" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #fdfbf8;">
						<tbody>
							<tr>
								<td>
									<table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #f6f2ea; border-radius: 0; color: #000000; width: 700px; margin: 0 auto;" width="700">
										<tbody>
											<tr>
												<td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top;">
													<table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
														<tr>
															<td class="col-pad" style="padding-bottom:5px;padding-top:5px;">
																<div class="spacer_block block-1" style="height:45px;line-height:45px;font-size:1px;">&#8202;</div>
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
					<table class="row row-6" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #fdfbf8; background-size: auto;">
						<tbody>
							<tr>
								<td>
									<table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff; background-size: auto; border-radius: 0; color: #000000; width: 700px; margin: 0 auto;" width="700">
										<tbody>
											<tr>
												<td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top;">
													<table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
														<tr>
															<td class="col-pad" style="padding-bottom:5px;padding-top:5px;">
																<div class="spacer_block block-1" style="height:45px;line-height:45px;font-size:1px;">&#8202;</div>
																<table class="button_block block-2" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
																	<tr>
																		<td class="pad" align="center"><a href="https://www.example.com" target="_blank" style="color:#101112;text-decoration:none;"><!--[if mso]>
<v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word"  href="https://www.example.com"  style="height:22px;width:165px;v-text-anchor:middle;" arcsize="19%" fillcolor="#e3ddd1">
<v:stroke dashstyle="Solid" weight="0px" color="#e3ddd1"/>
<w:anchorlock/>
<v:textbox inset="0px,0px,0px,0px">
<center dir="false" style="color:#101112;font-family:sans-serif;font-size:11px">
<![endif]--><span class="button" style="background-color: #e3ddd1; border-bottom: 0px solid transparent; border-left: 0px solid transparent; border-radius: 4px; border-right: 0px solid transparent; border-top: 0px solid transparent; color: #101112; display: inline-block; font-family: Arial, Helvetica, sans-serif; font-size: 11px; font-weight: 700; mso-border-alt: none; text-align: center; width: auto; word-break: keep-all; letter-spacing: 2px;"><span class="btn-pad" style="word-break: break-word; padding-left: 10px; padding-right: 10px; padding-top: 0px; padding-bottom: 0px; display: block;"><span style="word-break: break-word; line-height: 22px;">CUSTOMER STORIES</span></span></span><!--[if mso]></center></v:textbox></v:roundrect><![endif]--></a></td>
																	</tr>
																</table>
																<table class="heading_block block-3" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
																	<tr>
																		<td class="pad" style="width:100%;" align="center">
																			<h2 style="margin: 0; color: #090a0b; direction: ltr; font-family: Arial, Helvetica, sans-serif; font-size: 26px; font-weight: 700; letter-spacing: normal; line-height: 1.2; text-align: center; margin-top: 0; margin-bottom: 0; mso-line-height-alt: 31px;">Words That Stay With You</h2>
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
					<table class="row row-7" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #fdfbf8; background-size: auto;">
						<tbody>
							<tr>
								<td>
									<table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff; background-size: auto; border-radius: 0; color: #000000; width: 700px; margin: 0 auto;" width="700">
										<tbody>
											<tr>
												<td class="column column-1" width="50%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top;">
													<table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
														<tr>
															<td class="col-pad" style="padding-bottom:5px;padding-left:25px;padding-top:5px;">
																<table class="image_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
																	<tr>
																		<td class="pad" style="width:100%;padding-bottom:5px;padding-left:10px;padding-right:10px;" align="left">
																			<div style="max-width: 47.25px;"><a href="https://satinderpoetry.com/login" target="_blank"><img src="https://d1oco4z2z1fhwp.cloudfront.net/templates/default/10666/icon-tech.png" style="display: block; height: auto; border: 0; width: 100%;" width="47.25" alt="Icon Review" title="Icon Review" height="auto"></a></div>
																		</td>
																	</tr>
																</table>
																<table class="heading_block block-2" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
																	<tr>
																		<td class="pad" style="width:100%;" align="center">
																			<h3 style="margin: 0; color: #090a0b; direction: ltr; font-family: Arial, Helvetica, sans-serif; font-size: 20px; font-weight: 700; letter-spacing: normal; line-height: 1.2; text-align: left; margin-top: 0; margin-bottom: 0; mso-line-height-alt: 24px;"><span class="tinyMce-placeholder" style="word-break: break-word;">Vaibhav Soni</span></h3>
																		</td>
																	</tr>
																</table>
																<table class="paragraph_block block-3" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
																	<tr>
																		<td class="pad">
																			<div style="color:#535353;direction:ltr;font-family:Arial, Helvetica, sans-serif;font-size:16px;font-weight:400;letter-spacing:0px;line-height:1.8;text-align:left;mso-line-height-alt:29px;">
																				<p style="margin: 0;"><span style="word-break: break-word; color: #000000;"><strong>“Poetry is where silence finally speaks.”</strong></span></p>
																			</div>
																		</td>
																	</tr>
																</table>
																<table class="paragraph_block block-4" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
																	<tr>
																		<td class="pad">
																			<div style="color:#535353;direction:ltr;font-family:Arial, Helvetica, sans-serif;font-size:16px;font-weight:400;letter-spacing:0px;line-height:1.8;text-align:left;mso-line-height-alt:29px;">
																				<p style="margin: 0;">A collection of thoughts, emotions, and stories written from quiet moments of life.</p>
																			</div>
																		</td>
																	</tr>
																</table>
																<table class="image_block block-5" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
																	<tr>
																		<td class="pad" style="width:100%;padding-top:5px;padding-bottom:15px;padding-left:10px;padding-right:10px;" align="left">
																			<div style="max-width: 94.5px;"><img src="https://d1oco4z2z1fhwp.cloudfront.net/templates/default/10666/orange-icon-stars.png" style="display: block; height: auto; border: 0; width: 100%;" width="94.5" alt="Stars" title="Stars" height="auto"></div>
																		</td>
																	</tr>
																</table>
															</td>
														</tr>
													</table>
												</td>
												<td class="column gap" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top;">
													<table border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 20px; height: 20px;" width="20" height="20"></table>
												</td>
												<td class="column column-2" width="50%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top;">
													<table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
														<tr>
															<td class="col-pad" style="padding-bottom:5px;padding-right:25px;padding-top:5px;">
																<table class="image_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
																	<tr>
																		<td class="pad" style="width:100%;padding-bottom:5px;padding-left:10px;padding-right:10px;" align="left">
																			<div style="max-width: 47.25px;"><a href="https://satinderpoetry.com/login" target="_blank"><img src="https://d1oco4z2z1fhwp.cloudfront.net/templates/default/10666/icon-tech.png" style="display: block; height: auto; border: 0; width: 100%;" width="47.25" alt="Icon Review" title="Icon Review" height="auto"></a></div>
																		</td>
																	</tr>
																</table>
																<table class="heading_block block-2" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
																	<tr>
																		<td class="pad" style="width:100%;" align="center">
																			<h3 style="margin: 0; color: #090a0b; direction: ltr; font-family: Arial, Helvetica, sans-serif; font-size: 20px; font-weight: 700; letter-spacing: normal; line-height: 1.2; text-align: left; margin-top: 0; margin-bottom: 0; mso-line-height-alt: 24px;">Michael Chen</h3>
																		</td>
																	</tr>
																</table>
																<table class="paragraph_block block-3" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
																	<tr>
																		<td class="pad">
																			<div style="color:#535353;direction:ltr;font-family:Arial, Helvetica, sans-serif;font-size:16px;font-weight:400;letter-spacing:0px;line-height:1.8;text-align:left;mso-line-height-alt:29px;">
																				<p style="margin: 0;"><span style="word-break: break-word; color: #000000;"><strong>“Some feelings are easier written than spoken.”</strong></span></p>
																			</div>
																		</td>
																	</tr>
																</table>
																<table class="paragraph_block block-4" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
																	<tr>
																		<td class="pad">
																			<div style="color:#535353;direction:ltr;font-family:Arial, Helvetica, sans-serif;font-size:16px;font-weight:400;letter-spacing:0px;line-height:1.8;text-align:left;mso-line-height-alt:29px;">
																				<p style="margin: 0;">Thank you for becoming part of the<br>Satinder Poetry journey.</p>
																			</div>
																		</td>
																	</tr>
																</table>
																<table class="image_block block-5" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
																	<tr>
																		<td class="pad" style="width:100%;padding-top:5px;padding-bottom:50px;padding-left:10px;padding-right:10px;" align="left">
																			<div style="max-width: 94.5px;"><img src="https://d1oco4z2z1fhwp.cloudfront.net/templates/default/10666/orange-icon-stars.png" style="display: block; height: auto; border: 0; width: 100%;" width="94.5" alt="Stars" title="Stars" height="auto"></div>
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
					<!-- CTA SECTION -->
          <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation"
          style="background-color:#fdfbf8;">

          <tr>
          <td align="center">

          <table width="700" border="0" cellpadding="0" cellspacing="0"
          role="presentation"
          style="
          width:700px;
          max-width:700px;
          background-color:#090a0b;
          overflow:hidden;
          ">

          <!-- BACKGROUND IMAGE -->
          <tr>
          <td
          background="https://228fe3e270.imgdist.com/pub/bfra/jp6v7hcl/fah/0nb/di9/ChatGPT%20Image%20May%2023%2C%202026%2C%2009_16_43%20AM.png"
          style="
          background-image:url('https://228fe3e270.imgdist.com/pub/bfra/jp6v7hcl/fah/0nb/di9/ChatGPT%20Image%20May%2023%2C%202026%2C%2009_16_43%20AM.png');
          background-size:cover;
          background-position:center;
          background-repeat:no-repeat;
          padding:80px 40px;
          text-align:center;
          ">

          <!-- DARK OVERLAY -->
          <div style="
          background:rgba(0,0,0,0.55);
          padding:60px 30px;
          border-radius:18px;
          ">

          <!-- SMALL LABEL -->
          <div style="
          display:inline-block;
          background:#2d2d2d;
          padding:7px 16px;
          border-radius:6px;
          font-size:11px;
          font-weight:700;
          letter-spacing:2px;
          color:#ffffff;
          margin-bottom:24px;
          font-family:Arial,Helvetica,sans-serif;
          ">
          TAKE ACTION
          </div>

          <!-- HEADING -->
          <h2 style="
          margin:0;
          font-size:48px;
          line-height:56px;
          font-weight:700;
          color:#ffffff;
          font-family:Arial,Helvetica,sans-serif;
          letter-spacing:-1px;
          ">

          Your Subscription Is Confirmed ✨

          </h2>

          <!-- TEXT -->
          <p style="
          margin:24px auto 36px;
          font-size:18px;
          line-height:34px;
          color:#f3f4f6;
          font-family:Arial,Helvetica,sans-serif;
          max-width:520px;
          ">

          Stay connected for future poems,
          stories, and reflective writing updates.

          </p>

          <!-- BUTTON -->
          <a href="https://satinderpoetry.com"
          style="
          display:inline-block;
          background:#ffffff;
          color:#090a0b;
          text-decoration:none;
          padding:18px 38px;
          border-radius:999px;
          font-size:16px;
          font-weight:600;
          font-family:Arial,Helvetica,sans-serif;
          ">

          Explore Website ➜

          </a>

          </div>

          </td>
          </tr>

          </table>

          </td>
          </tr>

          </table>
					<table class="row row-9" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #fdfbf8;">
						<tbody>
							<tr>
								<td>
									<table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #f6f2ea; border-radius: 0; color: #000000; width: 700px; margin: 0 auto;" width="700">
										<tbody>
											<tr>
												<td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top;">
													<div class="spacer_block block-1" style="height:45px;line-height:45px;font-size:1px;">&#8202;</div>
												</td>
											</tr>
										</tbody>
									</table>
								</td>
							</tr>
						</tbody>
					</table>
					<table class="row row-10" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #fdfbf8;">
						<tbody>
							<tr>
								<td>
									<table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #f6f2ea; border-radius: 0; color: #000000; width: 700px; margin: 0 auto;" width="700">
										<tbody>
											<tr>
												<td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top;">
													<table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
														<tr>
															<td class="col-pad" style="padding-bottom:5px;padding-top:5px;">
																<table class="button_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
																	<tr>
																		<td class="pad" style="padding-bottom:10px;padding-left:10px;padding-right:10px;" align="center"><a href="https://www.example.com" target="_blank" style="color:#101112;text-decoration:none;"><!--[if mso]>
<v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word"  href="https://www.example.com"  style="height:22px;width:131px;v-text-anchor:middle;" arcsize="19%" fillcolor="#e3ddd1">
<v:stroke dashstyle="Solid" weight="0px" color="#e3ddd1"/>
<w:anchorlock/>
<v:textbox inset="0px,0px,0px,0px">
<center dir="false" style="color:#101112;font-family:sans-serif;font-size:11px">
<![endif]--><span class="button" style="background-color: #e3ddd1; border-bottom: 0px solid transparent; border-left: 0px solid transparent; border-radius: 4px; border-right: 0px solid transparent; border-top: 0px solid transparent; color: #101112; display: inline-block; font-family: Arial, Helvetica, sans-serif; font-size: 11px; font-weight: 700; mso-border-alt: none; text-align: center; width: auto; word-break: keep-all; letter-spacing: 2px;"><span class="btn-pad" style="word-break: break-word; padding-left: 10px; padding-right: 10px; padding-top: 0px; padding-bottom: 0px; display: block;"><span style="word-break: break-word; line-height: 22px;">Satinder Poetry</span></span></span><!--[if mso]></center></v:textbox></v:roundrect><![endif]--></a></td>
																	</tr>
																</table>
																<table class="heading_block block-2" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
																	<tr>
																		<td class="pad" style="width:100%;" align="center">
																			<h2 style="margin: 0; color: #101112; direction: ltr; font-family: Arial, Helvetica, sans-serif; font-size: 26px; font-weight: 700; letter-spacing: normal; line-height: 1.2; text-align: center; margin-top: 0; margin-bottom: 0; mso-line-height-alt: 31px;">Thank You For Subscribing ❤️</h2>
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
					<table class="row row-11" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #fdfbf8;">
						<tbody>
							<tr>
								<td>
									<table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #f6f2ea; border-radius: 0 0 20px 20px; color: #000000; width: 700px; margin: 0 auto;" width="700">
										<tbody>
											<tr>
												<td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top;">
													<table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
														<tr>
															<td class="col-pad" style="padding-bottom:5px;padding-top:5px;">
																<div class="spacer_block block-1" style="height:45px;line-height:45px;font-size:1px;">&#8202;</div>
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
					<table class="row row-12" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #fdfbf8;">
						<tbody>
							<tr>
								<td>
									<table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-radius: 0; color: #000000; width: 700px; margin: 0 auto;" width="700">
										<tbody>
											<tr>
												<td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top;">
													<table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
														<tr>
															<td class="col-pad" style="padding-bottom:5px;padding-top:5px;">
																<div class="spacer_block block-1" style="height:5px;line-height:5px;font-size:1px;">&#8202;</div>
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
					<table class="row row-13" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #fdfbf8;">
						<tbody>
							<tr>
								<td>
									<table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-radius: 0; color: #000000; width: 700px; margin: 0 auto;" width="700">
										<tbody>
											<tr>
												<td class="column column-1" width="33.333333333333336%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: middle;">
													<table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
														<tr>
															<td class="col-pad" style="padding-bottom:5px;padding-top:5px;">
																<table class="image_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
																	<tr>
																		<td class="pad" style="width:100%;padding-top:5px;padding-bottom:5px;" align="center">
																			<div style="max-width: 233.333px;"><a href="https://satinderpoetry.com" target="_blank"><img src="https://228fe3e270.imgdist.com/pub/bfra/jp6v7hcl/vfu/uho/prq/Satinder%20Poetry%20-%20Logo.png" style="display: block; height: auto; border: 0; width: 100%;" width="233.333" alt="Logo" title="Logo" height="auto"></a></div>
																		</td>
																	</tr>
																</table>
															</td>
														</tr>
													</table>
												</td>
												<td class="column column-2" width="33.333333333333336%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: middle;">
													<table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
														<tr>
															<td class="col-pad" style="padding-bottom:5px;padding-top:5px;">
																<table class="social_block block-1" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
																	<tr>
																		<td class="pad" align="center">
																			<table class="social-table" width="180px" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
																				<tr>
																					<td style="padding:0 0 0 0px;"><a href="https://www.facebook.com/satinder.singhsall" target="_blank"><img src="https://app-rsrc.getbee.io/public/resources/social-networks-icon-sets/circle-color/facebook@2x.png" width="32" height="auto" alt="Facebook" title="facebook" style="display: block; height: auto; border: 0;"></a></td>
																					<td style="padding:0 0 0 5px;"><a href="https://x.com/SallSatinder" target="_blank"><img src="https://app-rsrc.getbee.io/public/resources/social-networks-icon-sets/circle-color/twitter@2x.png" width="32" height="auto" alt="Twitter" title="twitter" style="display: block; height: auto; border: 0;"></a></td>
																					<td style="padding:0 0 0 5px;"><a href="https://www.linkedin.com/in/satinder-singh-sall-b62049204/" target="_blank"><img src="https://app-rsrc.getbee.io/public/resources/social-networks-icon-sets/circle-color/linkedin@2x.png" width="32" height="auto" alt="Linkedin" title="linkedin" style="display: block; height: auto; border: 0;"></a></td>
																					<td style="padding:0 0 0 5px;"><a href="https://www.instagram.com/satindersinghsall" target="_blank"><img src="https://app-rsrc.getbee.io/public/resources/social-networks-icon-sets/circle-color/instagram@2x.png" width="32" height="auto" alt="Instagram" title="instagram" style="display: block; height: auto; border: 0;"></a></td>
																					<td style="padding:0 0 0 5px;"><a href="https://www.youtube.com/@satindersinghsall.3841/featured" target="_blank"><img src="https://app-rsrc.getbee.io/public/resources/social-networks-icon-sets/circle-color/youtube@2x.png" width="32" height="auto" alt="YouTube" title="YouTube" style="display: block; height: auto; border: 0;"></a></td>
																				</tr>
																			</table>
																		</td>
																	</tr>
																</table>
															</td>
														</tr>
													</table>
												</td>
												<td class="column column-3" width="33.333333333333336%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: middle;">
													<table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
														<tr>
															<td class="col-pad" style="padding-bottom:5px;padding-top:5px;">
																<table class="paragraph_block block-1" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
																	<tr>
																		<td class="pad">
																			<div style="color:#101112;direction:ltr;font-family:Arial, Helvetica, sans-serif;font-size:13px;font-weight:400;letter-spacing:0px;line-height:1.2;text-align:center;mso-line-height-alt:16px;">
																				<p style="margin: 0;"><a href="https://satinderpoetry.com/profile" target="_blank" style="text-decoration: underline; color: #535353;" rel="noopener">Unsuscribe</a></p>
																			</div>
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
					<table class="row row-14" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
						<tbody>
							<tr>
								<td>
									<table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-radius: 0; color: #000000; width: 700px; margin: 0 auto;" width="700">
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
																					<td style="font-family: Arial, Helvetica, sans-serif; font-size: 14px; font-weight: 400; color: #140231; vertical-align: middle; letter-spacing: normal; text-align: center; line-height: normal;"><a href="https://designedwithbeefree.com/" target="_self" title="" style="color: #140231; text-decoration: none;">Designed with RGE Studio</a></td>
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

    res.json({ message: "Subscription successful! Check your email." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Subscription failed" });
  }
};

exports.getSubscribers = async (req, res) => {
  const subscribers = await Email.find().sort({ createdAt: -1 });
  res.json(subscribers);
};

exports.getSubscriberCount = async (req, res) => {
  const count = await Email.countDocuments();
  res.json({ count });
};

exports.deleteSubscriber = async (req, res) => {
  try {
    const subscriber = await Email.findByIdAndDelete(req.params.id);

    if (!subscriber) {
      return res.status(404).json({ message: "Subscriber not found" });
    }

    res.json({ message: "Subscriber deleted successfully" });
  } catch (err) {
    console.error("Delete subscriber error:", err);
    res.status(500).json({ message: "Failed to delete subscriber" });
  }
};

exports.getSubscriptionStatus = async (req, res) => {
  try {
    const record = await Email.findOne({ email: req.user.email });

    if (!record) {
      return res.json({
        subscribed: false,
        subscribedAt: null,
      });
    }

    res.json({
      subscribed: true,
      subscribedAt: record.createdAt,
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to check subscription" });
  }
};
