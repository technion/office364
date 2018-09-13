(defproject office354 "0.1.0-SNAPSHOT"
  :description "FIXME: write description"
  :url "http://example.com/FIXME"
  :license {:name "Eclipse Public License"
            :url "http://www.eclipse.org/legal/epl-v10.html"}
  :dependencies [[org.clojure/clojure "1.9.0" ] [clj-http "3.9.1"] [cheshire "5.8.0"]]
  :main ^:skip-aot office354.core
  :target-path "target/%s"
  :profiles {:uberjar {:aot :all}})
