投票系統 -- GoVote
組員: B06901071 何承叡, B06901074 李崇嘉, B06901072 黃奕呈

如何建立環境:
	1. 在terminal中執行: ganache-cli --allowUnlimitedContractSize  --gasLimit 0xFFFFFFFFFFFF
	2. 開啟之後複製剛剛開啟的ganache-cli的助記詞, 並到metamask使用"用助記詞匯入帳戶"
	3. 將metamask連線到localhost 8545, 此時metamask裡面應該會有10個有100Eth的帳戶
	4. 從github上下載我們的資料夾, cd至資料夾後在terminal上面執行: truffle compile 以及 truffle migrate
	5. 複製資料夾中的build資料夾, 並放入react/src/中
	6. 開啟terminal並cd至react/, 執行: npm start
	7. 此時DApp應該可以順利開啟

如何重現結果:
	A. 創建投票活動:
		1. 點擊首頁的"New Poll"按鈕, 輸入投票活動的主題後點擊"Add"創建活動
		2. 成功創建投票, 進入topic畫面後, 在畫面右上角的"new vote"欄位中輸入新的投票項目名稱並點擊"Add item"新增項目
		3. 在新增的項目右方會有edit的按鈕, 點擊進入後可以編輯該項目的候選人名單與投票人名單 (候選人可以任意取名, 但投票人的新增必須輸入該帳號的address)
		4. 編輯完成後, 回到topic頁面, 此時可以點擊右上角的"start"按鈕開始投票活動
		5. 若想結束投票, 在topic頁面點擊右上角的"end"按鈕就可以結束

	B. 如何參與投票活動:
		1. 點擊首頁的"vote"按鈕
		2. 進入下一個頁面後, 可在左上角的下拉式選單看到並選取自己可參與的投票活動, 點擊"import"按鈕就可以瀏覽該投票活動中, 所有可參與的投票項目
		3. 若投票尚未開始, 點擊進入該投票項目時, 只能查看候選人名單; 投票開始後, 就可以選取候選人, 並點擊"send"按鈕送出選票; 投票結束後, 可以查看各候選人的最終票數

注意事項:
	1. 在使用metamask切換帳戶時, 請務必重整網頁, 確認頁面上顯示的address與metamask當下帳號的address一致, 以避免錯誤發生
	2. 投票活動只能在開始前刪除
	3. 若要創建新的投票活動, 必須先刪除或結束前一個創建的活動


影片連結：
	https://youtu.be/HHoWXSFEvwM