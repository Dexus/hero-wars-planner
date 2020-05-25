
var toe = new Vue({
  el: '#toe',
  data: {
    filters: 'any',
    titans: [
      '4000', '4001', '4002', '4003',
      '4010', '4011', '4012', '4013',
      '4020', '4021', '4022', '4023'
    ],
    selectedTitans: [],
    matches: []
  },
  methods: {
    getEnemyTeam: function (team) {
      var titans = '';
      for (titan in team) titans += titan;

      return titans;
    },

    getSelectedTitans: function () {
      var titans = '';
      var selectedTeam = this.sortedSelectedTitans;
      for (titan in selectedTeam) titans += selectedTeam[titan];

      return titans;
    }
  },
  computed: {
    sortedSelectedTitans: function () {
      return this.selectedTitans.sort();
    },

    filteredMatches: function () {
      var t = this;
      var aFilteredMatches = t.matches.filter(function (match) {
        return (
          !t.selectedTitans.length &&
          (
            (t.filters == 'any' && match.enemypower < 1000000) ||
            (t.filters == 'only_lords' && match.enemypower > 1000000) ||
            (t.filters == 'only_gt_600k' && match.enemypower > 600000 && match.enemypower < 1000000) ||
            (t.filters == 'misses' && match.enemypower < 1000000 && match.defenceScoreEarned < 50)
          )

          ||

          t.selectedTitans.length && t.getSelectedTitans() == t.getEnemyTeam(match.defBattle.attackers) &&
          (
            (t.filters == 'any' && match.enemypower < 1000000) ||
            ((t.filters == 'only_lords') && (match.enemypower > 1000000)) ||
            ((t.filters == 'only_gt_600k') && (match.enemypower > 600000) && (match.enemypower < 1000000)) ||
            ((t.filters == 'misses') && match.enemypower < 1000000 && (match.defenceScoreEarned < 50))
          )
        )
      });

      var orderedMatches = aFilteredMatches.sort(function(a, b) {
        return b.enemypower - a.enemypower;
      });

      return orderedMatches;
    }
  }
});

$(function(){
  function getData(fileindex) {
    var nextfile = fileindex + 1;

    $.get('../toe/' + fileindex + '.json', function (data) {
      var matches = data.results[0].result.response.results;

      for (match in matches) {
        var thisMatch = matches[match];
        // add enemy total power to match data
        var power = 0;
        var attackerTeam = thisMatch.defBattle.attackers;
        for (titan in attackerTeam) {
          power += attackerTeam[titan].power;
        }
        matches[match].enemypower = power;

        toe.matches.push(matches[match]);
      }
    })
      .done(function () {
        getData(nextfile);
        $('.loadingbar').css({
          'width': fileindex + '%'
        });
      })
      .fail(function () {
        $('.loadingbar').css('width', '100%').delay(150).fadeOut(150);
      });
  }


  if ($('#toe').length) {
    getData(1);
  }
});
