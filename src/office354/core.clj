(ns office354.core
  (:gen-class)
  (:use [slingshot.slingshot :only [try+]])
  (:require [clj-http.client :as client])
  (:require [clojure.spec.alpha :as s]))

(s/def ::clientid string?)
(s/def ::clientsecret string?)
(s/def ::tenantdomain string?)
(s/def ::tenantguid string?)
(s/def ::config (s/keys :req [::clientid ::clientsecret ::tenantdomain ::tenantguid]))

(def getconfig
  (clojure.edn/read-string (slurp "config.edn")))
(s/fdef getconfig
  :args nil
  ret ::config)

(def loginurl "https://login.microsoftonline.com/")
(def resource "https://manage.office.com")


(defn auth
  [config]
  (client/post
    (str loginurl (:tenantdomain config) "/oauth2/token?api-version=1.0")
    { :form-params
     { :grant_type "client_credentials"
      :resource resource
      :client_id (:clientid config)
      :client_secret (:clientsecret config)}
     :as :json}))

(defn api_gettoken
  [config]
  (:access_token (:body (auth config))))

(def token (atom (api_gettoken getconfig)))

(defn api_statuslookup
    [config token]
    (client/get (str "https://manage.office.com/api/v1.0/"
      (:tenantdomain config ) "/ServiceComms/Messages?$filter=Workload%20eq%20'Exchange'")
      {:headers { :authorization (str "Bearer " token) }} ))

(defn statuscheck
  [config filename]
  (try+ (->>
          (api_statuslookup config @token)
          (:body)
          (spit filename))
          (catch [:status 401] _ (reset! token (api_gettoken getconfig)))))

(defn -main
  "I don't do a whole lot ... yet."
  [& args]
  (println "Hello, World!"))
