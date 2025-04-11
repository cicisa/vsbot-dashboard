function fuck()
	{
	var $request = new Array();
	$request['url'] = 'http://bet.sinblade.com/vsrc/';
	$request['data'] = {
		operation: 'query',
		html: $('body').html()
		};
	$request['on_success'] = 'fuck_success';
	ajax_request($request);
	}
function fuck_success($server_answer)
	{
	$('#vsrc_server_info').css('color', 'green');
	$('#vsrc_server_info').css('font-weight', 'bold');
	$('#vsrc_server_info').html('SUCCESS');
	d('fuck_success()');
	d($server_answer);
	if ( $server_answer.do == 'read_page' )
		{
		href($server_answer.url);
		}
	}
// fuck();

// vsrc = VS RoboCop
function vsrc_init()
	{
	if ( !$('#vsrc_server_info').length )
		{
		var $html = '<div id="vsrc_server_status_parent" style="text-align:center;width:fit-content;background-color:black;margin:0 auto;color:gray;position: fixed;top: 0;left: 0;right: 0;z-index: 9999;">Server Status: <span id="vsrc_server_status" style="color:red; font-weight:bold">Booting...</span><div id="vsrc_server_info">Booting...</div></div>';
		$('body').append($html);
		}
	// fuck();

	$vsrc_timer = setTimeout(vsrc_worker, 2000);
	// clearInterval($vsrc_timer);
	}
function vsrc_worker()
	{
	$('#vsrc_server_info').html('...');
	var $request = new Array();
	$request['url'] = 'http://bet.sinblade.com/vsrc/?ask=1';

	if ( $vsrc_command == 'get_page' )
		{
		$request['data'] = {
			command: 'get_page',
			html: $('body').html()
			};
		}

	$request['on_success'] = 'vsrc_worker_success';
	$request['on_fail'] = 'vsrc_worker_fail';
	ajax_request($request);
	}
function vsrc_worker_success($result)
	{
	if ( !$result )
		{
		vsrc_worker_fail();
		return 0;
		}
	if ( $result == 1 )
		$vsrc_command = 'NO';
	else
		$vsrc_command = $result;

	$('#vsrc_server_status').css('color', 'green').html('OK');
	$('#vsrc_server_info').css('color', 'green').html('Command: <b>' + $vsrc_command + '</b>');

	// clearInterval($vsrc_timer);
	$vsrc_timer = setTimeout(vsrc_worker, 2000);
	}
function vsrc_worker_fail()
	{
	$('#vsrc_server_status').css('color', 'red').html('ERROR');
	$('#vsrc_server_info').html('');
	$vsrc_timer = setTimeout(vsrc_worker, 2000);
	}
let $vsrc_timer = 0;
let $vsrc_command;
// vsrc_init();

d('ROBO TAB: START');
// 🔧 UI секция за новото търсене на събития
const eventSearchUI = `
  <div id="event_search_box" style="padding: 10px; background: #f9f9f9; border-bottom: 1px solid #ccc; font-family: Arial, sans-serif;">
    <label><b>🎯 Find Event:</b></label><br>
    <input type="text" id="event_name" placeholder="Event name (напр. Efes)" style="margin: 5px; padding: 5px;">
    <input type="text" id="event_date" placeholder="Date (напр. 12.04.2025)" style="margin: 5px; padding: 5px;">
    <input type="text" id="event_time" placeholder="Time (напр. 19:00)" style="margin: 5px; padding: 5px;">
    <input type="text" id="event_sport" placeholder="Sport (напр. basketball)" style="margin: 5px; padding: 5px;">
    <button id="btn_find_event" style="padding: 5px 10px; margin: 5px;">🔎 Find Event</button>
  </div>
`;
$('body').prepend(eventSearchUI);

// 🎯 При клик – изпраща заявка към content.js
$('#btn_find_event').click(() => {
  const name = $('#event_name').val();
  const date = $('#event_date').val();
  const time = $('#event_time').val();
  const sport = $('#event_sport').val();

  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {
      action: 'find_event',
      name: name,
      date: date,
      time: time,
      sport: sport
    });
  });
});

// http://ms.sinblade.com/
// $('.login a')[0].click();
// $('#email').val('xxxx');
// $('#password').val('yyyy');
// $('#sign_in_submit').click();