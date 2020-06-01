'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var FONT_GAP = 24;
var FONT_HEIGHT = 16;
var BAR_WIDTH = 40;
var BAR_MAX_HEIGHT = 150;
var BAR_GAP = 50;

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

window.renderStatistics = function (ctx, players, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';
  ctx.textBaseline = 'handing';
  ctx.fillText('Ура вы победили!', CLOUD_X + GAP*2, CLOUD_Y + GAP*3);
  ctx.fillText('Список результатов:', CLOUD_X + GAP*2, CLOUD_Y + GAP*3 + FONT_GAP);

  for (var i = 0; i < players.length; i++) {


  ctx.fillStyle = '#000';
  ctx.fillText(players[i], CLOUD_X + GAP*4 + (BAR_WIDTH + BAR_GAP)*i, CLOUD_HEIGHT - GAP);
  ctx.fillStyle = 'hsl(240, 100%, 50%)';
  ctx.fillRect(CLOUD_X + GAP*4 + (BAR_WIDTH + BAR_GAP)*i, CLOUD_Y + (FONT_HEIGHT + FONT_GAP)*2, BAR_WIDTH, BAR_MAX_HEIGHT);
};
};

