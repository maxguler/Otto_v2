/**
 * Otto Campers — Web App para recibir solicitudes de reserva
 * 1) Guarda en Google Sheet (opcional)
 * 2) Envía correo con resumen
 *
 * IMPORTANTE:
 * - Este script funciona como proyecto independiente (script.google.com)
 * - Debes configurar ID_HOJA_GOOGLE para guardar en Sheet
 * - Ejecuta pruebaManualCompleta() para probar inserción + correo
 */

var EMAIL_DESTINO = 'hello@ottocampers.com';
var ID_HOJA_GOOGLE = '1GV7alaiYqCh3Q7uW0h8zgOs07bi6wDMeHduryS9cW8k';
var NOMBRE_HOJA = 'Solicitudes';

function doGet() {
  return ContentService
    .createTextOutput('Otto Bookings Web App activa. Envíos por POST.')
    .setMimeType(ContentService.MimeType.TEXT);
}

function doPost(e) {
  Logger.log('[doPost] INICIO');
  var result = {
    ok: true,
    sheetSaved: false,
    emailSent: false,
    errors: []
  };

  try {
    var payload = extraerPayload(e);
    if (!payload) {
      Logger.log('[doPost] ERROR: No payload, devolviendo ok:false');
      return jsonOut({
        ok: false,
        sheetSaved: false,
        emailSent: false,
        errors: ['No payload']
      });
    }
    Logger.log('[doPost] payload OK -> nombre: ' + (payload.nombre || '—') + ', correo: ' + (payload.correo || '—') + ', total: ' + (payload.total || '—'));

    try {
      Logger.log('[doPost] Llamando guardarEnSheet, ID_HOJA_GOOGLE configurado: ' + !!ID_HOJA_GOOGLE);
      result.sheetSaved = guardarEnSheet(payload);
      Logger.log('[doPost] guardarEnSheet resultado: ' + result.sheetSaved);
      if (!result.sheetSaved) result.errors.push('Sheet no configurada (ID_HOJA_GOOGLE vacío).');
    } catch (errSheet) {
      Logger.log('[doPost] EXCEPCION guardarEnSheet: ' + errSheet);
      result.ok = false;
      result.errors.push('Sheet: ' + errSheet);
    }

    try {
      Logger.log('[doPost] Llamando enviarCorreo -> to: ' + EMAIL_DESTINO);
      enviarCorreo(payload);
      result.emailSent = true;
      Logger.log('[doPost] enviarCorreo OK');
    } catch (errMail) {
      Logger.log('[doPost] EXCEPCION enviarCorreo: ' + errMail);
      result.ok = false;
      result.errors.push('Email: ' + errMail);
    }

    Logger.log('[doPost] FIN -> result: ' + JSON.stringify(result));
    return jsonOut(result);
  } catch (err) {
    Logger.log('[doPost] EXCEPCION GLOBAL: ' + err);
    return jsonOut({
      ok: false,
      sheetSaved: false,
      emailSent: false,
      errors: [String(err)]
    });
  }
}

function extraerPayload(e) {
  var contentType = (e && e.postData && e.postData.type) ? String(e.postData.type).toLowerCase() : '';
  var rawBody = (e && e.postData && e.postData.contents) ? e.postData.contents : null;
  var paramData = (e && e.parameter && e.parameter.data) ? e.parameter.data : null;
  Logger.log('[extraerPayload] contentType=' + contentType + ', rawBody?=' + !!rawBody + ', paramData?=' + !!paramData);

  if (paramData) {
    try { return JSON.parse(paramData); } catch (errParam) { Logger.log('[extraerPayload] JSON.parse e.parameter.data error: ' + errParam); }
  }

  if (rawBody && contentType.indexOf('application/x-www-form-urlencoded') !== -1) {
    var m = rawBody.match(/(?:^|&)data=([^&]*)/);
    if (m && m[1] != null) {
      try {
        return JSON.parse(decodeURIComponent(m[1].replace(/\+/g, ' ')));
      } catch (errEncoded) {
        Logger.log('[extraerPayload] JSON.parse data=... en rawBody error: ' + errEncoded);
      }
    }
  }

  if (rawBody) {
    try { return JSON.parse(rawBody); } catch (errRaw) { Logger.log('[extraerPayload] JSON.parse rawBody error: ' + errRaw); }
  }

  return null;
}

function guardarEnSheet(payload) {
  Logger.log('[guardarEnSheet] INICIO');
  if (!ID_HOJA_GOOGLE) {
    Logger.log('[guardarEnSheet] ID_HOJA_GOOGLE vacío, saliendo sin guardar');
    return false;
  }
  Logger.log('[guardarEnSheet] Abriendo Sheet id=' + ID_HOJA_GOOGLE.substring(0, 8) + '...');
  var ss = SpreadsheetApp.openById(ID_HOJA_GOOGLE);
  var sheet = ss.getSheetByName(NOMBRE_HOJA) || ss.insertSheet(NOMBRE_HOJA);
  Logger.log('[guardarEnSheet] Hoja "' + sheet.getName() + '", ultima fila: ' + sheet.getLastRow());

  if (sheet.getLastRow() === 0) {
    Logger.log('[guardarEnSheet] Escribiendo encabezados');
    sheet.getRange(1, 1, 1, 20).setValues([[
      'Fecha/hora', 'Nombre', 'Correo', 'Telefono',
      'Retiro', 'Devolucion', 'Dias', 'Lugar retiro', 'Lugar devolucion',
      'Vehiculo', 'Temporada', 'Tarifa diaria',
      'Codigo descuento', '% Descuento',
      'Fee retiro', 'Fee devolucion',
      'Add-ons', 'Subtotal arriendo', 'Total add-ons', 'Total CLP'
    ]]);
    sheet.getRange(1, 1, 1, 20).setFontWeight('bold');
  }

  var addonsStr = Array.isArray(payload.addons) ? payload.addons.join('; ') : (payload.addons || '');
  sheet.appendRow([
    payload.timestamp || new Date().toISOString(),
    payload.nombre || '',
    payload.correo || '',
    payload.telefono || '',
    payload.pickup || '',
    payload.dropoff || '',
    payload.days || 0,
    payload.locationPickupLabel || payload.locationPickup || '',
    payload.locationDropoffLabel || payload.locationDropoff || '',
    payload.vehicleLabel || payload.vehicle || '',
    payload.season || '',
    payload.dailyRate || 0,
    payload.discountCode || '',
    payload.discountPercent || 0,
    payload.pickupFee || 0,
    payload.dropoffFee || 0,
    addonsStr,
    payload.rentalSubtotal || 0,
    payload.addonsTotal || 0,
    payload.total || 0
  ]);
  Logger.log('[guardarEnSheet] Fila appendRow OK, nueva ultima fila: ' + sheet.getLastRow());
  return true;
}

function enviarCorreo(payload) {
  Logger.log('[enviarCorreo] INICIO -> to: ' + EMAIL_DESTINO);
  var addonsStr = Array.isArray(payload.addons) ? payload.addons.join('; ') : (payload.addons || 'Ninguno');
  var totalFormatted = payload.total ? formatCLP(payload.total) : '—';
  var dailyRateFormatted = payload.dailyRate ? formatCLP(payload.dailyRate) : '—';

  var lines = [
    'Nueva solicitud de reserva — Otto Campers',
    '',
    'Contacto:',
    'Nombre: ' + (payload.nombre || '—'),
    'Correo: ' + (payload.correo || '—'),
    'WhatsApp/Telefono: ' + (payload.telefono || '—'),
    '',
    'Fechas:',
    'Retiro: ' + (payload.pickup || '—'),
    'Devolucion: ' + (payload.dropoff || '—') + ' (' + (payload.days || 0) + ' dias)',
    'Temporada: ' + (payload.season || '—'),
    '',
    'Lugares:',
    'Retiro: ' + (payload.locationPickupLabel || '—'),
    'Devolucion: ' + (payload.locationDropoffLabel || '—'),
  ];

  if (payload.pickupFee > 0 || payload.dropoffFee > 0) {
    lines.push('Fee retiro: ' + (payload.pickupFee ? formatCLP(payload.pickupFee) : '$0'));
    lines.push('Fee devolucion: ' + (payload.dropoffFee ? formatCLP(payload.dropoffFee) : '$0'));
  }

  lines.push('');
  lines.push('Vehiculo: ' + (payload.vehicleLabel || '—'));
  lines.push('Tarifa diaria: ' + dailyRateFormatted);

  if (payload.discountCode) {
    lines.push('Codigo descuento: ' + payload.discountCode + ' (' + (payload.discountPercent || 0) + '%)');
  }

  lines.push('Add-ons: ' + addonsStr);
  lines.push('');
  lines.push('Subtotal arriendo: ' + (payload.rentalSubtotal ? formatCLP(payload.rentalSubtotal) : '—'));
  lines.push('Total add-ons: ' + (payload.addonsTotal ? formatCLP(payload.addonsTotal) : '$0'));
  lines.push('Total estimado: ' + totalFormatted);

  var body = lines.join('\n');
  var subject = 'Solicitud de reserva Otto Campers — ' + (payload.nombre || 'Sin nombre');
  Logger.log('[enviarCorreo] Enviando MailApp.sendEmail to=' + EMAIL_DESTINO + ', subject=' + subject);
  MailApp.sendEmail({
    to: EMAIL_DESTINO,
    subject: subject,
    body: body,
    replyTo: payload.correo || EMAIL_DESTINO
  });
  Logger.log('[enviarCorreo] MailApp.sendEmail OK');
}

function pruebaManualCompleta() {
  Logger.log('[pruebaManualCompleta] INICIO');
  Logger.log('[pruebaManualCompleta] Config: ID_HOJA_GOOGLE=' + (ID_HOJA_GOOGLE ? ID_HOJA_GOOGLE.substring(0, 8) + '...' : 'VACIO') + ', EMAIL_DESTINO=' + EMAIL_DESTINO + ', NOMBRE_HOJA=' + NOMBRE_HOJA);

  var payload = {
    timestamp: new Date().toISOString(),
    nombre: 'PRUEBA MANUAL',
    correo: EMAIL_DESTINO,
    telefono: '+56 9 0000 0000',
    pickup: '2026-03-01',
    dropoff: '2026-03-08',
    days: 7,
    locationPickup: 'santiago',
    locationPickupLabel: 'Santiago (Hub principal), Chile',
    locationDropoff: 'punta-arenas',
    locationDropoffLabel: 'Punta Arenas, Chile',
    vehicle: 'scout',
    vehicleLabel: 'Otto Scout',
    season: 'Temporada alta (Nov–Mar)',
    durationTier: 'Menos de 20 días',
    dailyRate: 155000,
    discountCode: 'OTTO10',
    discountPercent: 10,
    pickupFee: 0,
    dropoffFee: 380000,
    addons: ['Permiso Argentina'],
    rentalSubtotal: 976500,
    addonsTotal: 220000,
    total: 1576500
  };

  var sheetSaved = guardarEnSheet(payload);
  Logger.log('[pruebaManualCompleta] guardarEnSheet=' + sheetSaved);
  enviarCorreo(payload);
  Logger.log('[pruebaManualCompleta] FIN OK -> sheetSaved=' + sheetSaved + ', emailSent=true');
}

function enviarEmailPrueba() {
  pruebaManualCompleta();
}

function jsonOut(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

function formatCLP(n) {
  return '$' + Number(n).toLocaleString('es-CL') + ' CLP';
}
