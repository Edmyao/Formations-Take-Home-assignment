import React, { Fragment, useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";

import { Transaction, TransactionCategory, TransactionPatch, TransactionPatchKeys } from "../interfaces/Transactions";
import { getRequest, patchRequest } from "../requests/requestHandlers";
import { TRANSACTIONS, TRANSACTION_CATEGORIES } from "../requests/url";
import AlertMessage from "./AlertMessage";
import Dropdown from "./inputs/Dropdown";

const SampleTable = () => {
    const tableHeader: string[] = ["Id", "Date", "Merchant", "Note", "Amount", "Category Name", "Actions"];

    useQuery("getTransactionCategories", getTransactionCategories);
    useQuery("getTransactions", getTransactions);

    const patchTransaction = useMutation(async (transactionId: string) => {
        try {
            setErrorMessage(null);
            await patchRequest(`${TRANSACTIONS}/${transactionId}`, form);
        } catch (error: any) {
            setErrorMessage(`Patch Transaction Error: ${error.message}`);
        }
    });

    const [editRow, setEditRow] = useState<number | null>(null);
    const [transactionList, setTransactionList] = useState<Transaction[]>([]);
    const [transactionCategoryList, setTransactionCategoryList] = useState<TransactionCategory[]>([]);

    const [form, setForm] = useState<TransactionPatch>({ date: "", note: "", category: "" });
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    function setEdit(index: number, transaction: Transaction) {
        setEditRow(index);
        setForm({ date: transaction.date, note: transaction.note, category: transaction.category });
    }

    function updateForm(key: TransactionPatchKeys, value: string) {
        setForm((prevState) => ({ ...prevState, [key]: value }));
    }

    function getCategoryName(categoryId: string) {
        const filtered = transactionCategoryList.filter((category) => category.id === categoryId);
        if (filtered.length === 0) return "";
        return filtered[0].name;
    }

    async function getTransactionCategories() {
        try {
            setErrorMessage(null);
            const response: TransactionCategory[] = await getRequest(`${TRANSACTION_CATEGORIES}`);
            setTransactionCategoryList(response);
        } catch (error: any) {
            setErrorMessage(`Get Transaction Categories Error: ${error.message}`);
        }
    }

    async function getTransactions() {
        try {
            setErrorMessage(null);
            const response: Transaction[] = await getRequest(`${TRANSACTIONS}`);
            setTransactionList(response);
        } catch (error: any) {
            setErrorMessage(`Get Transaction Error: ${error.message}`);
        }
    }

    return (
        <Fragment>
            <AlertMessage message={errorMessage} />

            <div className="table">
                <table className="bordered">
                    <thead>
                        <tr>
                            {tableHeader.map((header, i) => (
                                <th key={`${header}_${i}`}>{header}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {transactionList.length > 0 ? (
                            <Fragment>
                                {transactionList.map((transaction, i) => (
                                    <tr key={`transaction_${transaction.id}`}>
                                        <td>{transaction.id}</td>
                                        <td>
                                            {editRow === i ? (
                                                <input
                                                    type="date"
                                                    value={form.date}
                                                    onChange={(event) => updateForm("date", event.target.value)}
                                                />
                                            ) : (
                                                transaction.date
                                            )}
                                        </td>
                                        <td>{transaction.merchant}</td>
                                        <td>
                                            {editRow === i ? (
                                                <input
                                                    type="text"
                                                    value={form.note}
                                                    onChange={(event) => updateForm("note", event.target.value)}
                                                />
                                            ) : (
                                                transaction.note
                                            )}
                                        </td>
                                        <td>${transaction.amount}</td>

                                        <td>
                                            {editRow === i ? (
                                                <Dropdown
                                                    optionList={transactionCategoryList}
                                                    value={form.category}
                                                    onChange={(category) => updateForm("category", category)}
                                                />
                                            ) : (
                                                getCategoryName(transaction.category)
                                            )}
                                        </td>
                                        <td>
                                            {editRow === i ? (
                                                <Fragment>
                                                    <button onClick={() => patchTransaction.mutate(transaction.id)}>
                                                        Save
                                                    </button>
                                                    <button onClick={() => setEditRow(null)}>Cancel</button>
                                                </Fragment>
                                            ) : (
                                                <button onClick={() => setEdit(i, transaction)}>Edit</button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </Fragment>
                        ) : (
                            <tr>
                                <td colSpan={tableHeader.length} style={{ textAlign: "center" }}>
                                    No Transactions Found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </Fragment>
    );
};

export default SampleTable;
