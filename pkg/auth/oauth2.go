package auth

import (
	"context"
	"fmt"
	"io"
	"net/http"

	"github.com/rs/zerolog/log"
	"golang.org/x/oauth2"
)

// Oauth2 is the oauth2 configuration.
//
//	 ClientID:     "YOUR_CLIENT_ID",
//	 ClientSecret: "YOUR_CLIENT_SECRET",
//	 Scopes:       []string{"SCOPE1", "SCOPE2"},
//		Endpoint: oauth2.Endpoint{
//			AuthURL:  "https://provider.com/o/oauth2/auth",
//			TokenURL: "https://provider.com/o/oauth2/token",
//		},
type Oauth2 struct {
	oauth2.Config
	ApiUrl string
}

func (o *Oauth2) Login(w http.ResponseWriter, r *http.Request) {
	// Create oauthState cookie
	oauthState := generateStateOauthCookie(w)

	/*
		AuthCodeURL receive state that is a token to protect the user from CSRF attacks. You must always provide a non-empty string and
		validate that it matches the the state query parameter on your redirect callback.
	*/
	u := o.AuthCodeURL(oauthState)
	http.Redirect(w, r, u, http.StatusTemporaryRedirect)
}

func (o *Oauth2) Callback(w http.ResponseWriter, r *http.Request) {
	// Read oauthState from Cookie
	oauthstate, err := r.Cookie("oauthstate")
	if err != nil {
		log.Error().Err(err).Msg("oauthstate cookie not found")
		http.Error(w, "Invalid cookie state", http.StatusBadRequest)
		return
	}

	// Read oauthState from request
	if r.FormValue("state") != oauthstate.Value {
		log.Info().Msgf("invalid oauth state, expected %q, got %q", oauthstate.Value, r.FormValue("state"))
		http.Redirect(w, r, "/", http.StatusTemporaryRedirect)
		return
	}

	data, err := o.getUserDataFromGoogle(r.FormValue("code"))
	if err != nil {
		log.Error().Err(err).Msg("")
		http.Redirect(w, r, "/", http.StatusTemporaryRedirect)
		return
	}

	// GetOrCreate User in your db.
	// Redirect or response with a token.
	// More code .....
	fmt.Fprintf(w, "UserInfo: %s\n", data)
}

func (o *Oauth2) getUserDataFromGoogle(code string) ([]byte, error) {
	// Use code to get token and get user info from Google.

	token, err := o.Exchange(context.Background(), code)
	if err != nil {
		return nil, fmt.Errorf("code exchange wrong: %s", err.Error())
	}
	response, err := http.Get(o.ApiUrl + token.AccessToken)
	if err != nil {
		return nil, fmt.Errorf("failed getting user info: %s", err.Error())
	}
	defer response.Body.Close()
	contents, err := io.ReadAll(response.Body)
	if err != nil {
		return nil, fmt.Errorf("failed read response: %s", err.Error())
	}
	return contents, nil
}
