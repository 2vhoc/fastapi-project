## Này mình làm hệ thống Roll call Students for University nhưng mà làm được đến FE & BE rồi, còn 1 bước cuối nữa là nhúng model vào, nhưng mà không có data để train model:)))))), mình cho ChatGPT và Claude code FE:)), Backend mình dùng FastAPI tính để tết làm cho thoải mái, đợi rảnh thì push lên dockerhub cho dùng=)), còn muốn dùng thì làm theo các bước:
### nhớ thay tài khoản localhost database của các bạn vào nhé:))))
### B1: Mở folder trong Visual Studio Code -> chạy terminal
<pre><code class"language-javascript">
cd backend
</code></pre>


<pre><code class"language-javascript">
pip install -requirements.txt
</code></pre>
### B2:
<pre><code class"language-javascript">
uvicorn main:app --reload
</code></pre>



