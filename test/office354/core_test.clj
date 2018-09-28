(ns office354.core-test
  (:require [clojure.test :refer :all]
            [office354.core :refer :all]))

(deftest a-test
  (testing "Run API Check"
    (is (some? (:body (api_statuslookup getconfig @token))))))
