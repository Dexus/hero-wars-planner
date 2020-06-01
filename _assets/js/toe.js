
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
    }
  },
  filters: {
    humanDate: function (timestamp) {
      return new Date(timestamp * 1000).toLocaleString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
    },
    humanPlayer: function(id) {
      var player;

      if (id == 7737454) player = 'Zero';
      else if (id == 3244200) player = 'OPM';
      else if (id == 3075580) player = 'Other OPM';
      else player = 'Who knows';

      return player;
    }
  }
});

$(function () {
  if ($('#toe').length) {
    $.get('../assets/json/toedata.combined.min.json', function (data) {
      var matches = data.results[0].result.response.results;
      var matchesArray = [];

      // @TODO should move everything below to the build process
      // speed things up a little
      for (match in matches) {
        var thisMatch = matches[match];
        // add enemy total power to match data
        var power = 0;
        var attackerTeam = thisMatch.defBattle.attackers;
        for (titan in attackerTeam) {
          power += attackerTeam[titan].power;
        }
        thisMatch.enemypower = power;

        matchesArray.push(thisMatch);
      }

      var orderedMatches = matchesArray.sort(function (a, b) {
        return b.enemypower - a.enemypower;
      });

      toe.matches = orderedMatches;
    });
  }
});
