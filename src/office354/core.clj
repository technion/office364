(ns office354.core
  (:gen-class)
  (:use [slingshot.slingshot :only [try+]])
  (:require [clj-http.client :as client]))

(def getconfig
  (clojure.edn/read-string (slurp "config.edn")))

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

(defn gettoken
  [config]
  (:access_token (:body (auth config))))

(def token (atom (gettoken getconfig)))

(defn getstatus
    [config token]
    (client/get (str "https://manage.office.com/api/v1.0/" (:tenantdomain config ) "/ServiceComms/CurrentStatus")
      {:headers { :authorization (str "Bearer " token) }} ))

;(try+ (getstatus getconfig @token) (catch [:status 401] _ (reset! token (gettoken getconfig))))

(defn -main
  "I don't do a whole lot ... yet."
  [& args]
  (println "Hello, World!"))
