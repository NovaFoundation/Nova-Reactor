"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
require('rxjs/add/operator/map');
var GithubService = (function () {
    function GithubService(http) {
        this.http = http;
        this.u = {
            avatar_url: "https://avatars.githubusercontent.com/u/1524311?v=3",
            bio: "I reinvent wheels",
            blog: null,
            company: "Boeing",
            created_at: "2012-03-10T22:32:21Z",
            email: "BradenSteffaniak@gmail.com",
            events_url: "https://api.github.com/users/BSteffaniak/events{/privacy}",
            followers: 1,
            followers_url: "https://api.github.com/users/BSteffaniak/followers",
            following: 3,
            following_url: "https://api.github.com/users/BSteffaniak/following{/other_user}",
            gists_url: "https://api.github.com/users/BSteffaniak/gists{/gist_id}",
            gravatar_id: "",
            hireable: true,
            html_url: "https://github.com/BSteffaniak",
            id: 1524311,
            location: "United States",
            login: "BSteffaniak",
            name: "Braden Steffaniak",
            organizations_url: "https://api.github.com/users/BSteffaniak/orgs",
            public_gists: 0,
            public_repos: 23,
            received_events_url: "https://api.github.com/users/BSteffaniak/received_events",
            repos_url: "https://api.github.com/users/BSteffaniak/repos",
            site_admin: false,
            starred_url: "https://api.github.com/users/BSteffaniak/starred{/owner{/repo}",
            subscriptions_url: "https://api.github.com/users/BSteffaniak/subscriptions",
            type: "User",
            updated_at: "2016-11-08T00:40:19Z",
            url: "https://api.github.com/users/BSteffaniak"
        };
        this.r = { "id": 60387478, "name": "Nova", "full_name": "BSteffaniak/Nova", "owner": { "login": "BSteffaniak", "id": 1524311, "avatar_url": "https://avatars.githubusercontent.com/u/1524311?v=3", "gravatar_id": "", "url": "https://api.github.com/users/BSteffaniak", "html_url": "https://github.com/BSteffaniak", "followers_url": "https://api.github.com/users/BSteffaniak/followers", "following_url": "https://api.github.com/users/BSteffaniak/following{/other_user}", "gists_url": "https://api.github.com/users/BSteffaniak/gists{/gist_id}", "starred_url": "https://api.github.com/users/BSteffaniak/starred{/owner}{/repo}", "subscriptions_url": "https://api.github.com/users/BSteffaniak/subscriptions", "organizations_url": "https://api.github.com/users/BSteffaniak/orgs", "repos_url": "https://api.github.com/users/BSteffaniak/repos", "events_url": "https://api.github.com/users/BSteffaniak/events{/privacy}", "received_events_url": "https://api.github.com/users/BSteffaniak/received_events", "type": "User", "site_admin": false }, "private": false, "html_url": "https://github.com/BSteffaniak/Nova", "description": null, "fork": false, "url": "https://api.github.com/repos/BSteffaniak/Nova", "forks_url": "https://api.github.com/repos/BSteffaniak/Nova/forks", "keys_url": "https://api.github.com/repos/BSteffaniak/Nova/keys{/key_id}", "collaborators_url": "https://api.github.com/repos/BSteffaniak/Nova/collaborators{/collaborator}", "teams_url": "https://api.github.com/repos/BSteffaniak/Nova/teams", "hooks_url": "https://api.github.com/repos/BSteffaniak/Nova/hooks", "issue_events_url": "https://api.github.com/repos/BSteffaniak/Nova/issues/events{/number}", "events_url": "https://api.github.com/repos/BSteffaniak/Nova/events", "assignees_url": "https://api.github.com/repos/BSteffaniak/Nova/assignees{/user}", "branches_url": "https://api.github.com/repos/BSteffaniak/Nova/branches{/branch}", "tags_url": "https://api.github.com/repos/BSteffaniak/Nova/tags", "blobs_url": "https://api.github.com/repos/BSteffaniak/Nova/git/blobs{/sha}", "git_tags_url": "https://api.github.com/repos/BSteffaniak/Nova/git/tags{/sha}", "git_refs_url": "https://api.github.com/repos/BSteffaniak/Nova/git/refs{/sha}", "trees_url": "https://api.github.com/repos/BSteffaniak/Nova/git/trees{/sha}", "statuses_url": "https://api.github.com/repos/BSteffaniak/Nova/statuses/{sha}", "languages_url": "https://api.github.com/repos/BSteffaniak/Nova/languages", "stargazers_url": "https://api.github.com/repos/BSteffaniak/Nova/stargazers", "contributors_url": "https://api.github.com/repos/BSteffaniak/Nova/contributors", "subscribers_url": "https://api.github.com/repos/BSteffaniak/Nova/subscribers", "subscription_url": "https://api.github.com/repos/BSteffaniak/Nova/subscription", "commits_url": "https://api.github.com/repos/BSteffaniak/Nova/commits{/sha}", "git_commits_url": "https://api.github.com/repos/BSteffaniak/Nova/git/commits{/sha}", "comments_url": "https://api.github.com/repos/BSteffaniak/Nova/comments{/number}", "issue_comment_url": "https://api.github.com/repos/BSteffaniak/Nova/issues/comments{/number}", "contents_url": "https://api.github.com/repos/BSteffaniak/Nova/contents/{+path}", "compare_url": "https://api.github.com/repos/BSteffaniak/Nova/compare/{base}...{head}", "merges_url": "https://api.github.com/repos/BSteffaniak/Nova/merges", "archive_url": "https://api.github.com/repos/BSteffaniak/Nova/{archive_format}{/ref}", "downloads_url": "https://api.github.com/repos/BSteffaniak/Nova/downloads", "issues_url": "https://api.github.com/repos/BSteffaniak/Nova/issues{/number}", "pulls_url": "https://api.github.com/repos/BSteffaniak/Nova/pulls{/number}", "milestones_url": "https://api.github.com/repos/BSteffaniak/Nova/milestones{/number}", "notifications_url": "https://api.github.com/repos/BSteffaniak/Nova/notifications{?since,all,participating}", "labels_url": "https://api.github.com/repos/BSteffaniak/Nova/labels{/name}", "releases_url": "https://api.github.com/repos/BSteffaniak/Nova/releases{/id}", "deployments_url": "https://api.github.com/repos/BSteffaniak/Nova/deployments", "created_at": "2016-06-04T01:33:36Z", "updated_at": "2016-10-22T03:37:17Z", "pushed_at": "2016-11-08T05:00:57Z", "git_url": "git://github.com/BSteffaniak/Nova.git", "ssh_url": "git@github.com:BSteffaniak/Nova.git", "clone_url": "https://github.com/BSteffaniak/Nova.git", "svn_url": "https://github.com/BSteffaniak/Nova", "homepage": "", "size": 39040, "stargazers_count": 1, "watchers_count": 1, "language": "Java", "has_issues": true, "has_downloads": true, "has_wiki": true, "has_pages": false, "forks_count": 0, "mirror_url": null, "open_issues_count": 206, "forks": 0, "open_issues": 206, "watchers": 1, "default_branch": "master", "network_count": 0, "subscribers_count": 2 };
    }
    GithubService.prototype.getUser = function (username) {
        var _this = this;
        return this.http.get('https://rest.wolfpaq.co/RandomUser' /*'https://api.github.com/users/' + username*/).map(function (res) { return _this.u; });
    };
    GithubService.prototype.getRepo = function (username, repo) {
        var _this = this;
        return this.http.get('https://rest.wolfpaq.co/RandomUser' /*'https://api.github.com/repos/' + username + '/' + repo*/).map(function (res) { return _this.r; });
    };
    GithubService.prototype.getCommits = function (username, repo) {
        return this.http.get('https://api.github.com/repos/' + username + '/' + repo + '/commits').map(function (res) { return res.json(); });
    };
    GithubService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], GithubService);
    return GithubService;
}());
exports.GithubService = GithubService;
//# sourceMappingURL=github.service.js.map