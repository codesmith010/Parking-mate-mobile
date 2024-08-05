import React, { useEffect } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { getPaymentHistory } from "../../features/studentClassPayment/studentClassPaymentActions";
import BannerAd from "../../components/BannerAd";

const SPaymentHistory = () => {
  const { user } = useSelector((state) => state.user);
  const { StudentPaymentHistory, isLoading, error } = useSelector(
    (state) => state.StudentClassPayment
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPaymentHistory(user));
  }, []);

  console.log("StudentPaymentHistory: ", StudentPaymentHistory);

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.className}>{item.classID?.ClassName}</Text>
      <Text style={styles.classType}>{item.classID?.SelectClassType}</Text>
      <Text style={styles.instructorName}>
        Instructor: {item?.classID?.userID?.FirstName}{" "}
        {item?.classID?.userID?.LastName}
      </Text>
      <Text style={styles.amount}>Amount: ${item?.paymentAmount}</Text>
      <Text style={styles.paymentDate}>
        Paid on: {new Date(item?.paymentDate).toDateString()}
      </Text>
    </View>
  );

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>Payment History</Text>
        <Text style={styles.coolLine}>Keep track of your payment history</Text>
        <FlatList
          data={StudentPaymentHistory}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
          contentContainerStyle={styles.list}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        />
      </View>
      <BannerAd />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  coolLine: {
    color: "#007AFF",
    fontSize: 18,
    marginBottom: 16,
  },
  list: {
    flexGrow: 1,
  },
  item: {
    backgroundColor: "#F2F2F2",
    padding: 16,
    marginBottom: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E5E5E5",
  },
  className: {
    fontSize: 18,
    fontWeight: "bold",
  },
  classType: {
    fontSize: 16,
    color: "#555",
  },
  instructorName: {
    fontSize: 16,
  },
  amount: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 8,
  },
  paymentDate: {
    fontSize: 16,
    color: "#555",
  },
});

export default SPaymentHistory;
