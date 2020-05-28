
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
    },

    setTitans: function (team) {
      this.selectedTitans = team;
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

      var orderedMatches = aFilteredMatches.sort(function (a, b) {
        return b.enemypower - a.enemypower;
      });

      return orderedMatches;
    }
  },
  filters: {
    humanDate: function (timestamp) {
      return new Date(timestamp * 1000).toLocaleString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
    },
    humanPlayer: function(id) {
      console.log(id)
      var player;

      if (id == 7737454) player = 'Zero';
      else if (id == 3244200) player = 'OPM';
      else if (id == 3075580) player = 'Other OPM';

      return player;
    }
  }
});

$(function () {
  if ($('#toe').length) {
    $.get('../assets/json/toedata.combined.min.json', function (data) {
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
    });
  }
});
